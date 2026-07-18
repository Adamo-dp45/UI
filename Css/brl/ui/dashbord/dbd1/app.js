/* ════════════════════════════════════════
   DASHBOARD — app.js
   All interactivity, no inline handlers
   ════════════════════════════════════════ */

/* ══ SIDEBAR ══ */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const sidebarToggle = document.getElementById('sidebarToggle');

const isMobile = () => window.innerWidth <= 768;

function toggleSidebar() {
  if (isMobile()) {
    const open = sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('visible', open);
  } else {
    const collapsed = sidebar.classList.toggle('collapsed');
    // Reposition footer dropdown when collapsing/expanding
    const drop = document.getElementById('sidebarUserDrop');
    if (collapsed) {
      drop.style.left   = 'calc(100% + .5rem)';
      drop.style.right  = 'auto';
      drop.style.bottom = '0';
      drop.style.top    = 'auto';
    } else {
      drop.style.left   = '0';
      drop.style.right  = '0';
      drop.style.bottom = 'calc(100% + .375rem)';
      drop.style.top    = 'auto';
    }
  }
}

function closeSidebar() {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('visible');
}

sidebarToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

window.addEventListener('resize', () => {
  if (!isMobile()) {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('visible');
  }
});

/* ── Nav links (top-level) ── */
document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    link.classList.add('active');
    if (isMobile()) closeSidebar();
  });
});

/* ── Submenu toggles ── */
document.querySelectorAll('[data-submenu]').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();
    const id   = trigger.dataset.submenu;
    const menu = document.getElementById(id);
    if (!menu) return;

    const isOpen = menu.classList.contains('open');

    // Close all other submenus
    document.querySelectorAll('.submenu.open').forEach(m => {
      if (m.id !== id) {
        m.classList.remove('open');
        m.previousElementSibling?.classList.remove('open');
      }
    });

    menu.classList.toggle('open', !isOpen);
    trigger.classList.toggle('open', !isOpen);
  });
});

/* ── Sub-nav links ── */
document.querySelectorAll('[data-subnav]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sub-link').forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    if (isMobile()) closeSidebar();
  });
});

/* ── Sidebar user dropdown ── */
document.getElementById('sidebarUserBtn').addEventListener('click', e => {
  e.stopPropagation();
  const drop   = document.getElementById('sidebarUserDrop');
  const wasOpen = drop.classList.contains('open');
  closeAllDropdowns();
  if (wasOpen) return;

  if (isMobile()) {
    drop.style.position = 'absolute';
    drop.style.left     = '0';
    drop.style.right    = '0';
    drop.style.bottom   = 'calc(100% + .375rem)';
    drop.style.top      = 'auto';
    drop.style.minWidth = '0';
    drop.style.width    = '100%';
  } else {
    drop.style.cssText = '';
  }

  drop.classList.add('open');
});

/* ══ DROPDOWNS ══ */
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
}

function toggleDropdown(id, e) {
  e.stopPropagation();
  const drop   = document.getElementById(id);
  const wasOpen = drop.classList.contains('open');
  closeAllDropdowns();
  if (!wasOpen) drop.classList.add('open');
}

// Close on outside click
document.addEventListener('click', closeAllDropdowns);

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllDropdowns();
});

// [data-close-dropdown] elements
document.querySelectorAll('[data-close-dropdown]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    closeAllDropdowns();
  });
});

// Notification button
document.getElementById('notifBtn').addEventListener('click', e => {
  toggleDropdown('notifDrop', e);
});

// Profile avatar button
document.getElementById('profileBtn').addEventListener('click', e => {
  toggleDropdown('profileDrop', e);
});

// Prevent dropdown clicks from closing itself
document.querySelectorAll('.dropdown').forEach(drop => {
  drop.addEventListener('click', e => e.stopPropagation());
});

/* ══ NOTIFICATIONS ══ */
function updateNotifCount() {
  const unread = document.querySelectorAll('.notif-item.unread').length;
  const badge  = document.getElementById('notifCount');
  badge.textContent = unread;
  badge.style.display = unread > 0 ? 'flex' : 'none';
}

function markRead(item) {
  item.classList.remove('unread');
  item.querySelector('.notif-dot-item')?.classList.replace('unread', 'read');
  updateNotifCount();
}

function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(i => markRead(i));
  const sub = document.querySelector('#notifDrop .dropdown-subtitle');
  if (sub) sub.textContent = 'No unread messages';
}

// Delegate click on individual notif items
document.getElementById('notifList').addEventListener('click', e => {
  const item = e.target.closest('.notif-item');
  if (item) markRead(item);
});

document.getElementById('markAllReadBtn').addEventListener('click', e => {
  e.stopPropagation();
  markAllRead();
});

document.getElementById('viewAllNotifBtn').addEventListener('click', () => {
  closeAllDropdowns();
});

/* ══ THEME ══ */
document.getElementById('themeBtn').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  document.getElementById('sun-i').style.display  = dark ? 'none' : '';
  document.getElementById('moon-i').style.display = dark ? '' : 'none';
  document.getElementById('theme-lbl').textContent = dark ? 'Light' : 'Dark';
});

/* ══ SEARCH — ⌘K focus ══ */
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
});

document.getElementById('searchInput').addEventListener('focus', function () {
  this.select();
});
