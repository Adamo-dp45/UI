/* ═══════════════════════════════════════════
   DASHBOARD — app.js
   All interactivity, no inline HTML handlers
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. SIDEBAR — collapse / expand
  ───────────────────────────────────────── */
  const sidebar         = document.getElementById('sidebar');
  const sidebarToggle   = document.getElementById('sidebarToggle');
  const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
  const sidebarOverlay  = document.getElementById('sidebarOverlay');

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  mobileSidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    sidebarOverlay.classList.toggle('active');
  });

  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
  });


  /* ─────────────────────────────────────────
     2. SIDEBAR — accordion menus
  ───────────────────────────────────────── */
  document.querySelectorAll('.nav-accordion').forEach(accordion => {
    const trigger = accordion.querySelector('.nav-accordion-trigger');
    const content = accordion.querySelector('.nav-accordion-content');

    // Set initial height = 0
    content.style.height = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = accordion.classList.contains('open');

      // Close all others
      document.querySelectorAll('.nav-accordion.open').forEach(other => {
        if (other !== accordion) {
          other.classList.remove('open');
          other.querySelector('.nav-accordion-content').style.height = '0px';
        }
      });

      // Toggle current
      if (isOpen) {
        accordion.classList.remove('open');
        content.style.height = '0px';
      } else {
        accordion.classList.add('open');
        content.style.height = content.scrollHeight + 'px';
      }
    });
  });

  /* Re-measure on window resize (e.g. font scaling) */
  window.addEventListener('resize', () => {
    document.querySelectorAll('.nav-accordion.open').forEach(accordion => {
      const content = accordion.querySelector('.nav-accordion-content');
      content.style.height = content.scrollHeight + 'px';
    });
  });


  /* ─────────────────────────────────────────
     3. ACTIVE NAV ITEM — highlight on click
  ───────────────────────────────────────── */
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

  document.querySelectorAll('.nav-item[data-page], .nav-sub-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item.active').forEach(a => a.classList.remove('active'));
      item.classList.add('active');
      // Update breadcrumb
      const label = item.querySelector('span')?.textContent || item.textContent;
      if (breadcrumbCurrent) breadcrumbCurrent.textContent = label.trim();
      // Show toast
      showToast('Navigation', `Navigated to "${label.trim()}"`, 'info');
      // Close mobile sidebar
      if (window.innerWidth < 768) {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
      }
    });
  });


  /* ─────────────────────────────────────────
     4. USER POPOVER — sidebar footer
  ───────────────────────────────────────── */
  const userCardTrigger = document.getElementById('userCardTrigger');
  const userPopover     = document.getElementById('userPopover');

  userCardTrigger.addEventListener('click', e => {
    e.stopPropagation();
    userPopover.classList.toggle('open');
    closeOtherDropdowns(userPopover);
  });


  /* ─────────────────────────────────────────
     5. USER POPOVER — topbar avatar
  ───────────────────────────────────────── */
  const topbarAvatarBtn   = document.getElementById('topbarAvatarBtn');
  const topbarUserPopover = document.getElementById('topbarUserPopover');

  topbarAvatarBtn.addEventListener('click', e => {
    e.stopPropagation();
    topbarUserPopover.classList.toggle('open');
    closeOtherDropdowns(topbarUserPopover);
  });


  /* ─────────────────────────────────────────
     6. NOTIFICATIONS
  ───────────────────────────────────────── */
  const notifBtn      = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  const notifDot      = document.getElementById('notifDot');
  const markAllRead   = document.getElementById('markAllRead');

  // Count unread on init
  updateNotifDot();

  notifBtn.addEventListener('click', e => {
    e.stopPropagation();
    notifDropdown.classList.toggle('open');
    closeOtherDropdowns(notifDropdown);
  });

  markAllRead.addEventListener('click', e => {
    e.stopPropagation();
    document.querySelectorAll('.notif-item.unread').forEach(item => {
      item.classList.remove('unread');
      item.querySelector('.notif-unread-dot')?.remove();
    });
    updateNotifDot();
    showToast('Notifications', 'All notifications marked as read.', 'success');
  });

  // Click on notification item
  document.querySelectorAll('.notif-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.remove('unread');
      item.querySelector('.notif-unread-dot')?.remove();
      updateNotifDot();
      notifDropdown.classList.remove('open');
    });
  });

  function updateNotifDot() {
    const unread = document.querySelectorAll('.notif-item.unread').length;
    notifDot.classList.toggle('active', unread > 0);
  }


  /* ─────────────────────────────────────────
     7. THEME TOGGLE
  ───────────────────────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl      = document.documentElement;

  // Persist theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') htmlEl.classList.replace('dark', 'light');

  themeToggle.addEventListener('click', () => {
    if (htmlEl.classList.contains('dark')) {
      htmlEl.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
      showToast('Theme', 'Switched to light mode.', 'info');
    } else {
      htmlEl.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
      showToast('Theme', 'Switched to dark mode.', 'info');
    }
    // Re-render charts to pick up new CSS variable values
    setTimeout(rebuildCharts, 50);
  });


  /* ─────────────────────────────────────────
     8. CLOSE DROPDOWNS on outside click
  ───────────────────────────────────────── */
  const allDropdowns = [userPopover, topbarUserPopover, notifDropdown];

  function closeOtherDropdowns(except) {
    allDropdowns.forEach(d => { if (d !== except) d.classList.remove('open'); });
  }

  document.addEventListener('click', () => {
    allDropdowns.forEach(d => d.classList.remove('open'));
  });

  // Stop propagation inside dropdowns so they don't self-close
  allDropdowns.forEach(d => d.addEventListener('click', e => e.stopPropagation()));


  /* ─────────────────────────────────────────
     9. CHARTS — Chart.js
  ───────────────────────────────────────── */
  let overviewChart, donutChart;

  function getCSSVar(name) {
    return `hsl(${getComputedStyle(document.documentElement).getPropertyValue(name).trim()})`;
  }

  function buildOverviewChart() {
    const ctx = document.getElementById('overviewChart').getContext('2d');
    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const data   = [1800,2200,1950,2800,2200,3100,2600,3600,3200,4100,3800,4500];

    if (overviewChart) overviewChart.destroy();

    overviewChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Total',
            data,
            backgroundColor: getCSSVar('--chart-1').replace(')', '/0.85)').replace('hsl(', 'hsla('),
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: 'Previous Year',
            data: data.map(v => Math.round(v * 0.72)),
            backgroundColor: getCSSVar('--muted'),
            borderRadius: 4,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: getCSSVar('--popover'),
            titleColor: getCSSVar('--foreground'),
            bodyColor: getCSSVar('--muted-foreground'),
            borderColor: getCSSVar('--border'),
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx => ` $${ctx.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: getCSSVar('--muted-foreground'),
              font: { size: 11, family: 'Geist, sans-serif' }
            }
          },
          y: {
            grid: { color: getCSSVar('--border'), lineWidth: 1 },
            border: { display: false, dash: [4,4] },
            ticks: {
              color: getCSSVar('--muted-foreground'),
              font: { size: 11, family: 'Geist, sans-serif' },
              callback: v => '$' + (v/1000).toFixed(0) + 'k'
            }
          }
        }
      }
    });
  }

  function buildDonutChart() {
    const ctx = document.getElementById('donutChart').getContext('2d');
    if (donutChart) donutChart.destroy();

    donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Organic','Paid','Social','Referral'],
        datasets: [{
          data: [40,25,20,15],
          backgroundColor: [
            getCSSVar('--chart-1'),
            getCSSVar('--chart-2'),
            getCSSVar('--chart-3'),
            getCSSVar('--chart-4'),
          ],
          borderWidth: 2,
          borderColor: getCSSVar('--card'),
          hoverOffset: 4,
        }]
      },
      options: {
        cutout: '68%',
        responsive: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: getCSSVar('--popover'),
            titleColor: getCSSVar('--foreground'),
            bodyColor: getCSSVar('--muted-foreground'),
            borderColor: getCSSVar('--border'),
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
          }
        }
      }
    });
  }

  function rebuildCharts() {
    buildOverviewChart();
    buildDonutChart();
  }

  buildOverviewChart();
  buildDonutChart();

  /* Chart tabs */
  document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const period = tab.dataset.period;
      if (overviewChart) {
        if (period === 'weekly') {
          overviewChart.data.labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
          overviewChart.data.datasets[0].data = [420,550,480,690,530,740,620];
          overviewChart.data.datasets[1].data = [300,400,350,500,380,530,450];
        } else {
          overviewChart.data.labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          overviewChart.data.datasets[0].data = [1800,2200,1950,2800,2200,3100,2600,3600,3200,4100,3800,4500];
          overviewChart.data.datasets[1].data = [1296,1584,1404,2016,1584,2232,1872,2592,2304,2952,2736,3240];
        }
        overviewChart.update('active');
      }
    });
  });


  /* ─────────────────────────────────────────
     10. DATA TABLE — transactions
  ───────────────────────────────────────── */
  const tableData = [
    { status: 'success', email: 'ken99@yahoo.com',    method: 'Credit Card', amount: 316.00 },
    { status: 'success', email: 'abe45@gmail.com',    method: 'PayPal',      amount: 242.00 },
    { status: 'pending', email: 'monserrat44@gmail.com', method: 'Bank Transfer', amount: 837.00 },
    { status: 'failed',  email: 'silas22@gmail.com',  method: 'Credit Card', amount: 874.00 },
    { status: 'success', email: 'carmella@hotmail.com', method: 'Stripe',    amount: 721.00 },
    { status: 'success', email: 'lucinda@example.com', method: 'PayPal',     amount: 154.00 },
    { status: 'pending', email: 'briggs@test.com',    method: 'Bank Transfer', amount: 499.50 },
    { status: 'failed',  email: 'janko@email.io',     method: 'Credit Card', amount: 102.00 },
    { status: 'success', email: 'nadira@domain.com',  method: 'Stripe',      amount: 1200.00 },
    { status: 'pending', email: 'zhou.wei@corp.cn',   method: 'Bank Transfer', amount: 663.00 },
    { status: 'success', email: 'heloise@mail.fr',    method: 'Credit Card', amount: 88.00 },
    { status: 'failed',  email: 'tunde@africa.ng',    method: 'PayPal',      amount: 344.00 },
  ];

  let currentPage    = 1;
  const rowsPerPage  = 5;
  let sortCol        = null;
  let sortAsc        = true;
  let filterQuery    = '';
  let filteredData   = [...tableData];
  let selectedRows   = new Set();

  function renderTable() {
    filteredData = tableData.filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(filterQuery.toLowerCase()))
    );

    if (sortCol) {
      filteredData.sort((a, b) => {
        let va = a[sortCol], vb = b[sortCol];
        if (typeof va === 'string') va = va.toLowerCase(), vb = vb.toLowerCase();
        if (va < vb) return sortAsc ? -1 : 1;
        if (va > vb) return sortAsc ? 1 : -1;
        return 0;
      });
    }

    const start   = (currentPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);
    const tbody    = document.getElementById('tableBody');

    tbody.innerHTML = pageData.map((row, i) => {
      const globalIdx = start + i;
      const checked   = selectedRows.has(globalIdx) ? 'checked' : '';
      const statusClass = row.status;
      const statusLabel = row.status.charAt(0).toUpperCase() + row.status.slice(1);
      return `
        <tr>
          <td><input type="checkbox" class="table-checkbox row-check" data-idx="${globalIdx}" ${checked} /></td>
          <td><span class="status-badge ${statusClass}"><span class="status-dot"></span>${statusLabel}</span></td>
          <td style="color:hsl(var(--foreground))">${row.email}</td>
          <td style="color:hsl(var(--muted-foreground))">${row.method}</td>
          <td style="font-weight:600;font-family:'Geist Mono',monospace">$${row.amount.toFixed(2)}</td>
        </tr>`;
    }).join('');

    // Row checkboxes
    tbody.querySelectorAll('.row-check').forEach(cb => {
      cb.addEventListener('change', () => {
        const idx = parseInt(cb.dataset.idx);
        cb.checked ? selectedRows.add(idx) : selectedRows.delete(idx);
        updateTableCount();
      });
    });

    updateTableCount();
    updatePagination();
  }

  function updateTableCount() {
    document.getElementById('tableCount').textContent =
      selectedRows.size > 0
        ? `${selectedRows.size} of ${filteredData.length} row(s) selected.`
        : `${filteredData.length} row(s) total.`;
  }

  function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    document.getElementById('prevPage').disabled = currentPage <= 1;
    document.getElementById('nextPage').disabled = currentPage >= totalPages;
  }

  // Select all
  document.getElementById('selectAll').addEventListener('change', function() {
    const start = (currentPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);
    pageData.forEach((_, i) => {
      const idx = start + i;
      this.checked ? selectedRows.add(idx) : selectedRows.delete(idx);
    });
    renderTable();
  });

  // Sort columns
  document.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) sortAsc = !sortAsc;
      else { sortCol = col; sortAsc = true; }
      currentPage = 1;
      renderTable();
    });
  });

  // Search filter
  document.getElementById('tableSearch').addEventListener('input', function() {
    filterQuery  = this.value;
    currentPage  = 1;
    selectedRows.clear();
    renderTable();
  });

  // Pagination
  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; renderTable(); }
  });
  document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) { currentPage++; renderTable(); }
  });

  renderTable();


  /* ─────────────────────────────────────────
     11. TOAST SYSTEM
  ───────────────────────────────────────── */
  function showToast(title, description, type = 'info') {
    const container = document.getElementById('toastContainer');
    const icons = {
      success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(142 71% 45%)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
      error:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(0 72% 51%)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--chart-1))" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${description}</div>
      </div>
      <button class="toast-close" aria-label="Close">×</button>
    `;

    container.appendChild(toast);

    const close = () => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    };

    toast.querySelector('.toast-close').addEventListener('click', close);
    setTimeout(close, 4000);
  }

  // Expose globally for debugging / external calls
  window.showToast = showToast;


  /* ─────────────────────────────────────────
     12. KEYBOARD SHORTCUTS
  ───────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    // ⌘K / Ctrl+K — focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.search-input')?.focus();
    }
    // Escape — close all dropdowns
    if (e.key === 'Escape') {
      allDropdowns.forEach(d => d.classList.remove('open'));
    }
  });


  /* ─────────────────────────────────────────
     13. WELCOME TOAST on load
  ───────────────────────────────────────── */
  setTimeout(() => {
    showToast('Welcome back, Jean 👋', 'You have 2 unread notifications.', 'info');
  }, 600);

});
