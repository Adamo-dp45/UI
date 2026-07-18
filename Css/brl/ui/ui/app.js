// Pour que ça fonctionne sur le html on doit se passer du illégale return 'if (!sidebar || !sidebarOverlay || !btnSidebarToggle) return'

// document.addEventListener('turbo:load', function () {
    const MOBILE_BREAKPOINT = 1023

    const sidebar          = document.getElementById('sidebar')
    const sidebarOverlay   = document.getElementById('sidebar-overlay')
    const btnSidebarToggle = document.querySelector('[data-action="toggle-sidebar"]')

    if (!sidebar || !sidebarOverlay || !btnSidebarToggle) return

    const isMobile = function () {
        return window.innerWidth <= MOBILE_BREAKPOINT
    }

    const openSidebar = function () {
        sidebar.classList.add('is-mobile-open')
        sidebarOverlay.classList.add('is-visible')
        document.body.style.overflow = 'hidden'
        btnSidebarToggle.setAttribute('aria-expanded', 'true')
    }

    const closeSidebar = function () {
        sidebar.classList.remove('is-mobile-open')
        sidebarOverlay.classList.remove('is-visible')
        document.body.style.overflow = ''
        btnSidebarToggle.setAttribute('aria-expanded', 'false')
    }

    const collapseSidebar = function () {
        const isCollapsed = sidebar.classList.toggle('is-collapsed')
        btnSidebarToggle.setAttribute('aria-expanded', String(!isCollapsed))
        if (!isCollapsed) hideAllTooltips()
    }

    const toggleSidebar = function () {
        if (isMobile()) {
            sidebar.classList.contains('is-mobile-open') ? closeSidebar() : openSidebar()
        } else {
            collapseSidebar()
        }
    }

    // ── Tooltips (collapsed mode) ──────────────────────────────

    const hideAllTooltips = function () {
        document.querySelectorAll('.nav-tooltip').forEach(function (tooltip) {
            tooltip.classList.remove('is-visible')
            tooltip.setAttribute('aria-hidden', 'true')
        })
    }

    document.querySelectorAll('.nav-item-wrapper').forEach(function (wrapper) {
        const tooltip = wrapper.querySelector('.nav-tooltip')
        if (!tooltip) return

        const showTooltip = function () {
            if (!sidebar.classList.contains('is-collapsed')) return
            const rect      = wrapper.getBoundingClientRect()
            const collWidth = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--sidebar-collapsed-width')
            )
            tooltip.style.left      = `${collWidth + 12}px`
            tooltip.style.top       = `${rect.top + rect.height / 2}px`
            tooltip.style.transform = 'translateY(-50%) translateX(0)'
            tooltip.classList.add('is-visible')
            tooltip.removeAttribute('aria-hidden')
        }

        const hideTooltip = function () {
            tooltip.classList.remove('is-visible')
            tooltip.setAttribute('aria-hidden', 'true')
        }

        wrapper.addEventListener('mouseenter', showTooltip)
        wrapper.addEventListener('mouseleave', hideTooltip)
        wrapper.addEventListener('focusin',    showTooltip)
        wrapper.addEventListener('focusout',   hideTooltip)
    })

    // ── Submenus ───────────────────────────────────────────────

    const toggleSubmenu = function (trigger) {
        const submenuId = trigger.getAttribute('data-submenu')
        const submenu   = document.getElementById(submenuId)
        if (!submenu) return
        const isOpen = !submenu.classList.contains('is-closed')
        submenu.classList.toggle('is-closed', isOpen)
        trigger.classList.toggle('is-open', !isOpen)
        trigger.setAttribute('aria-expanded', String(!isOpen))
    }

    // ── Swipe to close (mobile) ────────────────────────────────

    let touchStartX = 0
    let touchStartY = 0

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
    }, { passive: true })

    document.addEventListener('touchend', function (e) {
        const dx = e.changedTouches[0].clientX - touchStartX
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartY)
        if (dx < -60 && dy < 40 && isMobile()) closeSidebar()
    }, { passive: true })

    // ── Event listeners ────────────────────────────────────────

    btnSidebarToggle.addEventListener('click', toggleSidebar)

    sidebarOverlay.addEventListener('click', closeSidebar)

    document.querySelectorAll('[data-action="toggle-submenu"]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            toggleSubmenu(trigger)
        })
    })

    window.addEventListener('resize', function () {
        if (!isMobile()) closeSidebar()
    })
// })

// document.addEventListener('turbo:load', function () {
    const btnThemeToggle = document.getElementById('btn-theme-toggle')
    const iconSun        = document.getElementById('icon-sun')
    const iconMoon       = document.getElementById('icon-moon')

    if (!btnThemeToggle || !iconSun || !iconMoon) return

    const applyTheme = function (isDark) {
        document.documentElement.classList.toggle('dark', isDark)
        iconSun.style.display  = isDark ? 'none'  : 'block'
        iconMoon.style.display = isDark ? 'block' : 'none'
        btnThemeToggle.setAttribute(
            'aria-label',
            isDark ? 'Basculer vers le mode clair' : 'Basculer vers le mode sombre'
        )
    }

    const toggleTheme = function () {
        const isDark = localStorage.theme !== 'dark'
        localStorage.theme = isDark ? 'dark' : 'light'
        applyTheme(isDark)
    }

    // Sync icons with the class already applied by the <head> script
    applyTheme(document.documentElement.classList.contains('dark'))

    btnThemeToggle.addEventListener('click', toggleTheme)
//})



// document.addEventListener('turbo:load', function () {
    let openDropdownPanel   = null
    let openDropdownTrigger = null

    if (!document.querySelector('[data-dropdown-target]')) return

    const openDropdown = function (panel, trigger) {
        panel.classList.add('is-open')
        trigger.classList.add('is-active')
        trigger.setAttribute('aria-expanded', 'true')
        openDropdownPanel   = panel
        openDropdownTrigger = trigger
        panel.querySelector('button, a, [tabindex="0"]')?.focus()
    }

    const closeDropdown = function () {
        if (openDropdownPanel === null) return
        openDropdownPanel.classList.remove('is-open')
        openDropdownTrigger.classList.remove('is-active')
        openDropdownTrigger.setAttribute('aria-expanded', 'false')
        openDropdownPanel   = null
        openDropdownTrigger = null
    }

    const toggleDropdown = function (panel, trigger) {
        const wasOpen = panel.classList.contains('is-open')
        closeDropdown()
        if (!wasOpen) openDropdown(panel, trigger)
    }

    // ── Event listeners ────────────────────────────────────────

    document.querySelectorAll('[data-dropdown-target]').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            e.stopPropagation()
            const targetId = trigger.getAttribute('data-dropdown-target')
            const panel    = document.getElementById(`dropdown-${targetId}`)
            if (!panel) return
            toggleDropdown(panel, trigger)
        })
    })

    document.addEventListener('click', function (e) {
        if (openDropdownPanel === null) return
        if (!openDropdownPanel.contains(e.target) && !openDropdownTrigger.contains(e.target)) {
            closeDropdown()
        }
    })

    // Tab trap inside open dropdown
    window.addEventListener('keydown', function (e) {
        if (openDropdownPanel === null || e.key !== 'Tab') return
        const focusables = Array.from(openDropdownPanel.querySelectorAll('button, a, [tabindex="0"]'))
        if (!focusables.length) return
        const first = focusables[0]
        const last  = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
        }
    })
// })

// document.addEventListener('turbo:load', function () {
    const btnMarkAllRead    = document.querySelector('[data-action="mark-notifications-read"]')
    const notificationDot   = document.getElementById('notification-dot')
    const notificationBadge = document.getElementById('notification-badge')
    const btnNotifications  = document.getElementById('btn-dropdown-notifications')

    if (!btnMarkAllRead || !btnNotifications) return

    const markAllRead = function () {
        document.querySelectorAll('.notification-item.is-unread').forEach(function (item) {
            item.classList.remove('is-unread')
        })
        document.querySelectorAll('.notification-item__unread-indicator').forEach(function (dot) {
            dot.remove()
        })
        if (notificationDot)   notificationDot.style.display = 'none'
        if (notificationBadge) {
            notificationBadge.textContent      = 'Tout lu'
            notificationBadge.style.background = 'var(--color-surface-2)'
            notificationBadge.style.color      = 'var(--color-text-3)'
        }
        btnNotifications?.setAttribute('aria-label', 'Notifications — toutes lues')
    }

    // ── Event listeners ────────────────────────────────────────

    btnMarkAllRead.addEventListener('click', markAllRead)
// })

// document.addEventListener('turbo:load', function () {
    const userPopup    = document.getElementById('user-popup')
    const btnUserPopup = document.getElementById('btn-user-popup')
    const sidebarEl    = document.getElementById('sidebar')

    if (!userPopup || !btnUserPopup || !sidebarEl) return

    const repositionUserPopup = function () {
        const sbRect  = sidebarEl.getBoundingClientRect()
        const btnRect = btnUserPopup.getBoundingClientRect()
        if (!sidebarEl.classList.contains('is-collapsed')) {
            userPopup.style.left  = `${sbRect.left + 8}px`
            userPopup.style.width = `${sbRect.width - 16}px`
        } else {
            userPopup.style.left  = `${sbRect.right + 8}px`
            userPopup.style.width = '234px'
        }
        userPopup.style.bottom = `${window.innerHeight - btnRect.top + 6}px`
        userPopup.style.top    = 'auto'
    }

    const openUserPopup = function () {
        repositionUserPopup()
        userPopup.classList.add('is-open')
        btnUserPopup.classList.add('is-open')
        btnUserPopup.setAttribute('aria-expanded', 'true')
        userPopup.querySelector('a, button, [tabindex="0"]')?.focus()
    }

    const closeUserPopup = function () {
        userPopup.classList.remove('is-open')
        btnUserPopup.classList.remove('is-open')
        btnUserPopup.setAttribute('aria-expanded', 'false')
    }

    const toggleUserPopup = function () {
        userPopup.classList.contains('is-open') ? closeUserPopup() : openUserPopup()
    }

    // ── Event listeners ────────────────────────────────────────

    btnUserPopup.addEventListener('click', function (e) {
        e.stopPropagation()
        toggleUserPopup()
    })

    document.addEventListener('click', function (e) {
        if (!userPopup.contains(e.target) && !btnUserPopup.contains(e.target)) {
            closeUserPopup()
        }
    })
// })

// document.addEventListener('turbo:load', function () {
    const spotlightBackdrop = document.getElementById('spotlight-backdrop')
    const spotlightPanel    = document.getElementById('spotlight')
    const spotlightInput    = document.getElementById('spotlight-input')
    const spotlightResults  = document.getElementById('spotlight-results')

    if (!spotlightBackdrop || !spotlightPanel || !spotlightInput || !spotlightResults) return

    let selectedIndex = -1
    let filteredItems = []

    const SPOTLIGHT_DATA = [
        { group: 'Navigation', icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>', title: 'Dashboard', sub: "Vue d'ensemble générale", href: '/dashboard' },
        { group: 'Navigation', icon: '<path d="M1 17l3-9h16l3 9M1 17h22M6.5 17a2 2 0 100-4 2 2 0 000 4zM17.5 17a2 2 0 100-4 2 2 0 000 4zM4 8h16"/>', title: 'Flotte — Véhicules', sub: 'Liste et gestion des véhicules', href: '/flotte/vehicules' },
        { group: 'Navigation', icon: '<path d="M1 17l3-9h16l3 9M1 17h22M6.5 17a2 2 0 100-4 2 2 0 000 4zM17.5 17a2 2 0 100-4 2 2 0 000 4zM4 8h16"/>', title: 'Flotte — Marques', sub: 'Gérer les marques de véhicules', href: '/flotte/marques' },
        { group: 'Navigation', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: 'Exploitation — Voyages', sub: 'Planification et suivi des voyages', href: '/exploitation/voyages' },
        { group: 'Navigation', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: 'Exploitation — Gares', sub: 'Gestion des gares routières', href: '/exploitation/gares' },
        { group: 'Navigation', icon: '<path d="M2 9a3 3 0 010-6h20a3 3 0 010 6M2 9v12h20V9M12 9v12"/>', title: 'Billetterie — Tickets', sub: 'Ventes et réservations', href: '/billetterie/tickets' },
        { group: 'Navigation', icon: '<path d="M2 9a3 3 0 010-6h20a3 3 0 010 6M2 9v12h20V9M12 9v12"/>', title: 'Billetterie — Tarifs', sub: 'Grilles tarifaires', href: '/billetterie/tarifs' },
        { group: 'Navigation', icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>', title: 'Rapports', sub: 'Rapports et exports PDF', href: '/rapports' },
        { group: 'Navigation', icon: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>', title: 'Personnel', sub: 'Chauffeurs, convoyeurs, agents', href: '/personnel' },
        { group: 'Navigation', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', title: 'Admins', sub: 'Gestion des administrateurs', href: '/admins' },
        { group: 'Navigation', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 20v2M12 2v2"/>', title: 'Paramètres', sub: "Configuration de l'application", href: '/parametres' },
        { group: 'Véhicules récents', icon: '<path d="M1 17l3-9h16l3 9M1 17h22M6.5 17a2 2 0 100-4 2 2 0 000 4zM17.5 17a2 2 0 100-4 2 2 0 000 4zM4 8h16"/>', title: 'VH-019 · Mercedes Sprinter', sub: 'En dépannage · PK 142', href: '/flotte/vehicules/VH-019' },
        { group: 'Véhicules récents', icon: '<path d="M1 17l3-9h16l3 9M1 17h22M6.5 17a2 2 0 100-4 2 2 0 000 4zM17.5 17a2 2 0 100-4 2 2 0 000 4zM4 8h16"/>', title: 'VH-004 · Mercedes Sprinter', sub: 'En route · Abidjan → Bouaké', href: '/flotte/vehicules/VH-004' },
        { group: 'Véhicules récents', icon: '<path d="M1 17l3-9h16l3 9M1 17h22M6.5 17a2 2 0 100-4 2 2 0 000 4zM17.5 17a2 2 0 100-4 2 2 0 000 4zM4 8h16"/>', title: 'VH-011 · Toyota Coaster', sub: 'En gare · Abidjan', href: '/flotte/vehicules/VH-011' },
        { group: 'Voyages récents', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: 'V-2081 · Abidjan → Bouaké', sub: '08:00 · 46/50 passagers · En route', href: '/exploitation/voyages/V-2081' },
        { group: 'Voyages récents', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: 'V-2082 · Abidjan → San Pedro', sub: '09:30 · 28/45 passagers · En gare', href: '/exploitation/voyages/V-2082' },
        { group: 'Voyages récents', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: 'V-2079 · Daloa → Abidjan', sub: '05:30 · 50/50 passagers · Arrivé', href: '/exploitation/voyages/V-2079' },
        { group: 'Actions rapides', icon: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', title: 'Nouveau voyage', sub: 'Créer un voyage planifié', href: '/exploitation/voyages/nouveau', kbd: 'N' },
        { group: 'Actions rapides', icon: '<path d="M3 8h18v13H3z"/><path d="M16 8V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v3"/>', title: 'Vendre un ticket', sub: 'Ouvrir la caisse de vente', href: '/billetterie/tickets/vente', kbd: 'T' },
        { group: 'Actions rapides', icon: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>', title: 'Exporter rapport du jour', sub: 'Télécharger en PDF ou Excel', href: '/rapports/export', kbd: 'E' },
    ]

    const escapeRegex = function (str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

    const highlight = function (text, query) {
        if (!query) return text
        return text.replace(new RegExp(`(${escapeRegex(query)})`, 'gi'), '<mark>$1</mark>')
    }

    const renderResults = function (query) {
        const q = (query || '').trim().toLowerCase()

        filteredItems = q
            ? SPOTLIGHT_DATA.filter(function (item) {
                return item.title.toLowerCase().includes(q)
                    || item.sub.toLowerCase().includes(q)
                    || item.group.toLowerCase().includes(q)
            })
            : SPOTLIGHT_DATA

        selectedIndex = filteredItems.length > 0 ? 0 : -1
        spotlightInput.setAttribute('aria-activedescendant',
            selectedIndex >= 0 ? `spotlight-item-${selectedIndex}` : ''
        )

        if (!filteredItems.length) {
            spotlightResults.innerHTML = `
                <div class="spotlight__empty" role="status" aria-live="polite">
                    <svg width="36" height="36" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <div class="spotlight__empty-title">Aucun résultat pour « ${q} »</div>
                    <div class="spotlight__empty-subtitle">Essayez un autre mot-clé</div>
                </div>`
            return
        }

        const groups = {}
        filteredItems.forEach(function (item, i) {
            if (!groups[item.group]) groups[item.group] = []
            groups[item.group].push({ ...item, idx: i })
        })

        let html = ''
        for (const [groupName, items] of Object.entries(groups)) {
            html += `<div class="spotlight__section-label" aria-hidden="true">${groupName}</div>`
            items.forEach(function (item) {
                const isSelected = item.idx === selectedIndex
                html += `
                    <div class="spotlight__result-item${isSelected ? ' is-selected' : ''}"
                         id="spotlight-item-${item.idx}"
                         role="option"
                         aria-selected="${isSelected}"
                         aria-label="${item.title} — ${item.sub}"
                         tabindex="-1"
                         data-result-idx="${item.idx}">
                        <div class="spotlight__result-icon" aria-hidden="true">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${item.icon}</svg>
                        </div>
                        <div class="spotlight__result-body">
                            <div class="spotlight__result-title">${highlight(item.title, q)}</div>
                            <div class="spotlight__result-sub">${highlight(item.sub, q)}</div>
                        </div>
                        ${item.kbd ? `<div class="spotlight__result-shortcut" aria-hidden="true"><span class="spotlight__kbd">${item.kbd}</span></div>` : ''}
                    </div>`
            })
        }
        spotlightResults.innerHTML = html
    }

    const updateSelectedItem = function (newIndex) {
        const items = spotlightResults.querySelectorAll('.spotlight__result-item')
        if (!items.length) return
        selectedIndex = ((newIndex % filteredItems.length) + filteredItems.length) % filteredItems.length
        items.forEach(function (el) {
            const isSelected = parseInt(el.dataset.resultIdx) === selectedIndex
            el.classList.toggle('is-selected', isSelected)
            el.setAttribute('aria-selected', isSelected)
        })
        spotlightInput.setAttribute('aria-activedescendant', `spotlight-item-${selectedIndex}`)
        document.getElementById(`spotlight-item-${selectedIndex}`)?.scrollIntoView({ block: 'nearest' })
    }

    const selectItem = function (index) {
        const item = filteredItems[index]
        if (!item) return
        closeSpotlight()
        if (item.href) window.location.href = item.href
    }

    const openSpotlight = function () {
        spotlightBackdrop.classList.add('is-open')
        spotlightPanel.classList.add('is-open')
        document.body.style.overflow = 'hidden'
        spotlightInput.value = ''
        renderResults('')
        setTimeout(function () { spotlightInput.focus() }, 60)
    }

    const closeSpotlight = function () {
        spotlightBackdrop.classList.remove('is-open')
        spotlightPanel.classList.remove('is-open')
        document.body.style.overflow = ''
    }

    const isSpotlightOpen = function () {
        return spotlightPanel.classList.contains('is-open')
    }

    // ── Event listeners ────────────────────────────────────────

    document.querySelectorAll('[data-action="open-spotlight"]').forEach(function (trigger) {
        trigger.addEventListener('click', openSpotlight)
    })

    document.querySelectorAll('[data-action="close-spotlight"]').forEach(function (trigger) {
        trigger.addEventListener('click', closeSpotlight)
    })

    spotlightInput.addEventListener('input', function (e) {
        renderResults(e.target.value)
    })

    spotlightResults.addEventListener('click', function (e) {
        const item = e.target.closest('[data-result-idx]')
        if (item) selectItem(parseInt(item.dataset.resultIdx))
    })

    spotlightResults.addEventListener('mousemove', function (e) {
        const item = e.target.closest('[data-result-idx]')
        if (!item) return
        const idx = parseInt(item.dataset.resultIdx)
        if (idx === selectedIndex) return
        selectedIndex = idx
        spotlightResults.querySelectorAll('.spotlight__result-item').forEach(function (el) {
            const isSelected = parseInt(el.dataset.resultIdx) === idx
            el.classList.toggle('is-selected', isSelected)
            el.setAttribute('aria-selected', isSelected)
        })
    })

    window.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault()
            isSpotlightOpen() ? closeSpotlight() : openSpotlight()
            return
        }
        if (!isSpotlightOpen()) return
        if (e.key === 'Escape')    { e.preventDefault(); closeSpotlight(); return }
        if (e.key === 'ArrowDown') { e.preventDefault(); updateSelectedItem(selectedIndex + 1); return }
        if (e.key === 'ArrowUp')   { e.preventDefault(); updateSelectedItem(selectedIndex - 1); return }
        if (e.key === 'Enter')     { e.preventDefault(); selectItem(selectedIndex); return }
        if (e.key === 'Tab')       { e.preventDefault() }
    })
// })

// document.addEventListener('turbo:load', function () {
    const barChartContainer = document.getElementById('bar-chart-bars')
    const barChartLabels    = document.getElementById('bar-chart-labels')

    if (!barChartContainer || !barChartLabels) return

    const DAYS     = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    const CURRENT  = [820, 1140, 980, 1284, 760, 1080, 540]
    const PREVIOUS = [700, 950, 860, 1100, 840, 930, 480]
    const max      = Math.max(...CURRENT, ...PREVIOUS)

    DAYS.forEach(function (day, i) {
        const hCurrent  = Math.round(CURRENT[i]  / max * 88)
        const hPrevious = Math.round(PREVIOUS[i] / max * 88)

        const column = document.createElement('div')
        column.className = 'bar-chart__column'
        column.innerHTML = `
            <div class="bar-chart__bar bar-chart__bar--previous"
                 style="height:${hPrevious}px"
                 role="img"
                 aria-label="${day} semaine passée : ${PREVIOUS[i]} tickets"></div>
            <div class="bar-chart__bar bar-chart__bar--current"
                 style="height:${hCurrent}px"
                 role="img"
                 aria-label="${day} cette semaine : ${CURRENT[i]} tickets"></div>`
        barChartContainer.appendChild(column)

        const label = document.createElement('div')
        label.className   = 'bar-chart__label'
        label.textContent = day
        barChartLabels.appendChild(label)
    })
// })