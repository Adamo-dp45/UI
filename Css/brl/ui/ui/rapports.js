/**
 * rapports.js — Module Dashboard & Rapports
 *
 * À inclure APRÈS app.js (le JS du dashboard principal).
 * Ce fichier n'interfère pas avec la sidebar, le header,
 * le spotlight ou le mode sombre déjà gérés par app.js.
 *
 * NOUVEAUTÉS ajoutées par ce module :
 *  1. Système de toasts (feedback export PDF / Excel)
 *  2. Navigation entre sous-pages du module
 *  3. Rendu du graphique en barres (recettes mensuelles)
 *  4. Rendu de la heatmap hebdomadaire
 *  5. Animation des KPI au scroll (IntersectionObserver)
 *  6. Sélecteur de période dans le header
 */

'use strict';


/* ─────────────────────────────────────────────────────────────
   1. TOASTS
   API publique : Rapports.toast(message, type)
   type : 'success' | 'error' | 'info'  (défaut : 'success')
───────────────────────────────────────────────────────────── */

const Toasts = (() => {
  const DURATION = 3500; // ms avant disparition automatique

  /** Renvoie (et crée si besoin) la zone de toast en bas à droite */
  function getZone() {
    let zone = document.getElementById('toast-zone');
    if (!zone) {
      zone = document.createElement('div');
      zone.id = 'toast-zone';
      zone.className = 'toast-zone';
      zone.setAttribute('aria-live', 'polite');
      zone.setAttribute('aria-atomic', 'false');
      document.body.appendChild(zone);
    }
    return zone;
  }

  /** Construit le SVG d'icône selon le type */
  function buildIconSvg(type) {
    const icons = {
      success: '<path d="M20 6L9 17l-5-5"/>',
      error:   '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    };
    return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"
             stroke="#fff" stroke-width="2.5" stroke-linecap="round"
             aria-hidden="true">${icons[type] ?? icons.success}</svg>`;
  }

  /** Supprime un toast avec animation de sortie */
  function dismiss(el) {
    el.classList.add('toast--exiting');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  /** Affiche un toast */
  function show(message, type = 'success') {
    const zone = getZone();
    const id   = `toast-${Date.now()}`;

    const el = document.createElement('div');
    el.className = 'toast';
    el.id = id;
    el.setAttribute('role', 'status');

    el.innerHTML = `
      <div class="toast__icon toast__icon--${type}" aria-hidden="true">
        ${buildIconSvg(type)}
      </div>
      <span>${message}</span>
      <button class="toast__close" aria-label="Fermer la notification">✕</button>
    `;

    el.querySelector('.toast__close').addEventListener('click', () => dismiss(el));
    zone.appendChild(el);

    setTimeout(() => {
      if (document.getElementById(id)) dismiss(el);
    }, DURATION);
  }

  return { show };
})();


/* ─────────────────────────────────────────────────────────────
   2. NAVIGATION ENTRE SOUS-PAGES DU MODULE
   Gère les onglets .report-subnav__tab et les sections .report-page
───────────────────────────────────────────────────────────── */

const ReportNav = (() => {
  /** Active l'onglet cliqué et affiche la page correspondante */
  function activate(tabEl) {
    const target = tabEl.dataset.target;
    if (!target) return;

    // Onglets
    document.querySelectorAll('.report-subnav__tab').forEach(t => {
      t.classList.toggle('is-active', t === tabEl);
      t.setAttribute('aria-selected', t === tabEl ? 'true' : 'false');
    });

    // Pages
    document.querySelectorAll('.report-page').forEach(page => {
      const isActive = page.id === target;
      page.hidden = !isActive;
      page.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    // Met à jour le fil d'Ariane si présent
    const breadcrumbCurrent = document.querySelector('.breadcrumb__current');
    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent = tabEl.textContent.trim();
    }
  }

  function init() {
    const tabs = document.querySelectorAll('.report-subnav__tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.setAttribute('role', 'tab');
      tab.addEventListener('click', () => activate(tab));
    });

    // Active le premier onglet par défaut
    const initial = document.querySelector('.report-subnav__tab.is-active') ?? tabs[0];
    if (initial) activate(initial);
  }

  return { init };
})();


/* ─────────────────────────────────────────────────────────────
   3. GRAPHIQUE EN BARRES  —  recettes mensuelles
   Injecte dynamiquement les barres dans #bar-chart-monthly
───────────────────────────────────────────────────────────── */

const BarChartMonthly = (() => {
  const DATA = [
    { label: 'Avr', current: 6.2  },
    { label: 'Mai', current: 7.1  },
    { label: 'Jun', current: 8.4  },
    { label: 'Jul', current: 7.8  },
    { label: 'Aoû', current: 9.0  },
    { label: 'Sep', current: 8.6  },
    { label: 'Oct', current: 8.2  },
    { label: 'Nov', current: 9.1  },
    { label: 'Déc', current: 10.4 },
    { label: 'Jan', current: 9.8  },
    { label: 'Fév', current: 10.9 },
    { label: 'Mar', current: 12.5, isCurrent: true },
  ];

  const Y_MAX = 14; // valeur max affichée sur l'axe Y

  /** Crée une barre et son tooltip */
  function createBar(entry) {
    const heightPct = Math.round((entry.current / Y_MAX) * 100);
    const opacity   = entry.isCurrent ? 1 : 0.5;

    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.cssText = `
      height: ${heightPct}%;
      background: var(--color-amber);
      opacity: ${opacity};
    `;
    bar.setAttribute('role', 'img');
    bar.setAttribute('aria-label', `${entry.label} : ${entry.current}M FCFA`);

    const tooltip = document.createElement('div');
    tooltip.className = 'chart-bar__tooltip';
    tooltip.textContent = `${entry.label} : ${entry.current}M`;
    bar.appendChild(tooltip);

    return bar;
  }

  /** Crée un label d'axe X */
  function createXLabel(text) {
    const el = document.createElement('div');
    el.textContent = text;
    return el;
  }

  function render(barsContainerId, xAxisContainerId) {
    const barsEl = document.getElementById(barsContainerId);
    const xEl    = document.getElementById(xAxisContainerId);
    if (!barsEl || !xEl) return;

    DATA.forEach(entry => {
      barsEl.appendChild(createBar(entry));
      xEl.appendChild(createXLabel(entry.label));
    });
  }

  return { render };
})();


/* ─────────────────────────────────────────────────────────────
   4. HEATMAP HEBDOMADAIRE
   Injecte les cellules dans #report-heatmap
───────────────────────────────────────────────────────────── */

const Heatmap = (() => {
  // 28 valeurs = 4 semaines × 7 jours (lun → dim)
  const VALUES = [
    2,  4,  8,  6, 12, 14,  5,
    3,  5,  9,  7, 11, 15,  6,
    2,  6, 10,  8, 12, 16,  7,
    1,  4,  7,  5,  9, 12,  4,
  ];

  function render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const max = Math.max(...VALUES);

    VALUES.forEach(v => {
      const pct  = Math.round((v / max) * 90 + 5); // 5%–95% d'intensité
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.style.background =
        `color-mix(in srgb, var(--color-amber) ${pct}%, var(--color-surface-3))`;
      cell.setAttribute('title', `${v} voyage${v > 1 ? 's' : ''}`);
      cell.setAttribute('aria-label', `${v} voyage${v > 1 ? 's' : ''}`);
      el.appendChild(cell);
    });
  }

  return { render };
})();


/* ─────────────────────────────────────────────────────────────
   5. ANIMATION DES KPI  —  compteur animé au premier affichage
   Utilise IntersectionObserver pour ne déclencher qu'une fois visible.
───────────────────────────────────────────────────────────── */

const KpiAnimator = (() => {
  const DURATION = 1200; // ms

  /** Anime un nombre de 0 vers la valeur cible */
  function animateValue(el, target, suffix) {
    const start   = performance.now();
    const isFloat = !Number.isInteger(target);

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = target * eased;

      el.textContent = isFloat
        ? current.toFixed(1) + suffix
        : Math.round(current).toLocaleString('fr-FR') + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const raw    = el.dataset.kpiValue;
        const suffix = el.dataset.kpiSuffix ?? '';
        if (!raw) return;

        const target = parseFloat(raw);
        animateValue(el, target, suffix);
        observer.unobserve(el); // ne déclenche qu'une fois
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-kpi-value]').forEach(el => observer.observe(el));
  }

  return { init };
})();


/* ─────────────────────────────────────────────────────────────
   6. SÉLECTEUR DE PÉRIODE
   Écoute les <select class="period-select"> et met à jour
   le sous-titre de la page (élément .page-header__subtitle).
───────────────────────────────────────────────────────────── */

const PeriodSelector = (() => {
  function init() {
    document.querySelectorAll('.period-select').forEach(select => {
      select.addEventListener('change', () => {
        const subtitle = document.querySelector('.page-header__subtitle');
        if (subtitle) {
          const chosen = select.options[select.selectedIndex].text;
          // Conserve le "· Mise à jour …" existant si présent
          const parts  = subtitle.innerHTML.split('&nbsp;·&nbsp;');
          parts[0] = chosen;
          subtitle.innerHTML = parts.join('&nbsp;·&nbsp;');
        }

        // Feedback utilisateur
        Toasts.show(`Données filtrées : ${select.value}`, 'info');
      });
    });
  }

  return { init };
})();


/* ─────────────────────────────────────────────────────────────
   7. BOUTONS D'EXPORT  —  data-export="pdf|excel"
   Déclenche un toast de confirmation + simule la génération.
───────────────────────────────────────────────────────────── */

const ExportButtons = (() => {
  function init() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-export]');
      if (!btn) return;

      const type   = btn.dataset.export;
      const labels = { pdf: 'PDF', excel: 'Excel' };
      const label  = labels[type] ?? type.toUpperCase();

      btn.disabled = true;
      btn.style.opacity = '.6';

      // Simule une génération asynchrone (à remplacer par un vrai appel API)
      setTimeout(() => {
        Toasts.show(`${label} généré avec succès.`, 'success');
        btn.disabled = false;
        btn.style.opacity = '';
      }, 800);
    });
  }

  return { init };
})();


/* ─────────────────────────────────────────────────────────────
   INITIALISATION  —  point d'entrée unique
───────────────────────────────────────────────────────────── */

function initRapportsModule() {
  ReportNav.init();
  BarChartMonthly.render('bar-chart-monthly-bars', 'bar-chart-monthly-xaxis');
  Heatmap.render('report-heatmap');
  KpiAnimator.init();
  PeriodSelector.init();
  ExportButtons.init();
}

// Lance après le chargement complet du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRapportsModule);
} else {
  initRapportsModule();
}
