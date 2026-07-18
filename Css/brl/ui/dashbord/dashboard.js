/**
 * dashboard.js — Dashboard UI interactions
 * No inline handlers; all logic is event-driven from here.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initAccordions();
  initTabs();
  initDropdowns();
  renderTransactions();
  renderPerformance();
  renderActivity();
});

/* ─────────────────────────────────────────
   THEME
───────────────────────────────────────── */
function initTheme() {
  const html     = document.documentElement;
  const btn      = document.getElementById('themeToggle');
  const iconSun  = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  // Thème déjà appliqué par le script bloquant dans <head>.
  // On synchronise juste les icônes puis on branche le bouton.
  syncThemeIcons(html.getAttribute('data-theme'), iconSun, iconMoon);

  btn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncThemeIcons(next, iconSun, iconMoon);
  });
}

function syncThemeIcons(theme, iconSun, iconMoon) {
  if (iconSun)  iconSun.style.display  = theme === 'dark' ? 'none'  : 'block';
  if (iconMoon) iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
}

/* ─────────────────────────────────────────
   SIDEBAR — toggle on desktop & mobile
───────────────────────────────────────── */

const SIDEBAR_KEY = 'sidebar-collapsed';

function initSidebar() {
  const btn     = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('overlay');

  // État déjà appliqué par le script bloquant dans <head> — rien à faire ici.

  btn?.addEventListener('click', () => {
    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
      const collapsed = document.documentElement.classList.toggle('sidebar-collapsed');
      localStorage.setItem(SIDEBAR_KEY, collapsed);
    } else {
      const isOpen = document.body.classList.toggle('sidebar-open');
      overlay.classList.toggle('show', isOpen);
    }
  });

  overlay?.addEventListener('click', closeMobileSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileSidebar();
    }
  });
}

function closeMobileSidebar() {
  document.body.classList.remove('sidebar-open');
  document.getElementById('overlay')?.classList.remove('show');
}

/* ─────────────────────────────────────────
   ACCORDIONS
───────────────────────────────────────── */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen  = trigger.classList.contains('open');

      trigger.classList.toggle('open', !isOpen);
      content?.classList.toggle('open', !isOpen);
    });
  });
}

/* ─────────────────────────────────────────
   TABS
───────────────────────────────────────── */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.tabs-wrap')
        ?.querySelectorAll('.tab-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ─────────────────────────────────────────
   DROPDOWNS — profile bubbles
───────────────────────────────────────── */
function initDropdowns() {
  // Toggle on trigger click
  const triggers = [
    document.getElementById('sidebarUserBtn'),
    document.getElementById('headerAvatarBtn'),
  ];

  triggers.forEach(trigger => {
    if (!trigger) return;

    trigger.addEventListener('click', e => {
      e.stopPropagation();

      const targetId = trigger.dataset.target;
      const menu     = document.getElementById(targetId);
      if (!menu) return;

      const isOpen = menu.classList.contains('open');

      // Close all open menus first
      closeAllDropdowns();

      if (!isOpen) {
        menu.classList.add('open');
        trigger.classList.add('open'); // rotates chevron on user-btn
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', closeAllDropdowns);

  // Prevent clicks inside a menu from closing it
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', e => e.stopPropagation());
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
    menu.classList.remove('open');
  });
  // Reset user-btn open state (chevron)
  document.getElementById('sidebarUserBtn')?.classList.remove('open');
}

/* ─────────────────────────────────────────
   TRANSACTIONS TABLE
───────────────────────────────────────── */
const TRANSACTIONS = [
  { name: 'Olivia Martin',    email: 'olivia.m@email.com',   type: 'Abonnement', status: 'success', amount: '+$1 999,00' },
  { name: 'Jackson Lee',      email: 'jackson.l@email.com',  type: 'Logiciel',   status: 'success', amount: '+$39,00'    },
  { name: 'Isabella Nguyen',  email: 'isabella.n@email.com', type: 'Services',   status: 'warning', amount: '+$299,00'   },
  { name: 'William Kim',      email: 'will@email.com',        type: 'Licences',   status: 'danger',  amount: '-$99,00'    },
  { name: 'Sofia Davis',      email: 'sofia.d@email.com',    type: 'Abonnement', status: 'success', amount: '+$149,00'   },
  { name: 'Luca Bernardi',    email: 'luca.b@email.com',     type: 'Services',   status: 'success', amount: '+$599,00'   },
  { name: 'Emma Dupont',      email: 'emma.d@email.com',     type: 'Logiciel',   status: 'warning', amount: '+$29,00'    },
];

const STATUS_MAP = {
  success: { cls: 'badge-success', label: 'Succès'      },
  warning: { cls: 'badge-warning', label: 'En attente'  },
  danger:  { cls: 'badge-danger',  label: 'Échoué'      },
};

function renderTransactions() {
  const tbody = document.getElementById('txTableBody');
  if (!tbody) return;

  tbody.innerHTML = TRANSACTIONS.map(tx => {
    const { cls, label } = STATUS_MAP[tx.status];
    const amountClass = tx.amount.startsWith('-') ? 'style="color:var(--danger-fg)"' : '';

    return `
      <tr>
        <td><span style="font-weight:500">${tx.name}</span></td>
        <td class="td-muted">${tx.email}</td>
        <td><span class="badge badge-plain badge-default">${tx.type}</span></td>
        <td><span class="badge ${cls}">${label}</span></td>
        <td class="td-mono" style="text-align:right;font-weight:500" ${amountClass}>${tx.amount}</td>
      </tr>
    `;
  }).join('');
}

/* ─────────────────────────────────────────
   PERFORMANCE TARGETS
───────────────────────────────────────── */
const PERFORMANCE = [
  { label: 'Revenus objectif',    value: 72 },
  { label: 'Nouveaux clients',    value: 58 },
  { label: 'Taux de conversion',  value: 89 },
  { label: 'Satisfaction client', value: 94 },
];

function renderPerformance() {
  const el = document.getElementById('perfContainer');
  if (!el) return;

  el.innerHTML = PERFORMANCE.map(p => `
    <div class="progress-row">
      <div class="progress-head">
        <span class="progress-label">${p.label}</span>
        <span class="progress-val">${p.value}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width:${p.value}%"></div>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   RECENT ACTIVITY
───────────────────────────────────────── */
const ACTIVITY = [
  { text: 'Nouvelle commande #4821 reçue',          time: 'Il y a 2 min',   dot: 'dot-success' },
  { text: 'Utilisateur Isabella Nguyen inscrit',     time: 'Il y a 14 min',  dot: 'dot-success' },
  { text: 'Paiement en attente — William Kim',       time: 'Il y a 42 min',  dot: 'dot-warning' },
  { text: 'Livraison #3309 échouée',                 time: 'Il y a 1h',      dot: 'dot-danger'  },
  { text: 'Rapport mensuel généré avec succès',      time: 'Il y a 3h',      dot: ''            },
];

function renderActivity() {
  const el = document.getElementById('activityContainer');
  if (!el) return;

  el.innerHTML = ACTIVITY.map(a => `
    <div class="activity-item">
      <span class="activity-dot ${a.dot}"></span>
      <div class="activity-main">
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}
