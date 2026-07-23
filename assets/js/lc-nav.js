/**
 * lc-nav.js
 * logicacode — Header behaviour: sticky, desktop mega-menu, mobile drawer.
 *
 * Depends on: lc-components.js  (listens for 'lc:components:ready' event)
 * CSS: assets/css/lc-nav.css
 */

(function () {
    'use strict';

    /* ── CONFIG ──────────────────────────────────────────────────────── */
    var STICKY_OFFSET   = 60;   // px scrolled before shadow is added
    var HOVER_DELAY_MS  = 150;  // ms before mega-menu opens on hover

    /* ── STATE ───────────────────────────────────────────────────────── */
    var openDesktopItem = null; // currently open desktop dropdown <li>
    var hoverTimer      = null; // debounce timer for hover open
    var closeTimer      = null; // debounce timer for hover close

    /* ── ELEMENT REFS (set after components are injected) ──────────── */
    var header, menuTrigger, drawer, overlay, closeBtn;

    /* ── STICKY ──────────────────────────────────────────────────────── */

    function handleScroll() {
        if (!header) return;
        if (window.scrollY > STICKY_OFFSET) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }

    /* ── DESKTOP MEGA-MENU ───────────────────────────────────────────── */

    function openDesktop(li) {
        if (openDesktopItem && openDesktopItem !== li) {
            closeDesktop(openDesktopItem);
        }
        openDesktopItem = li;
        li.classList.add('lc-open');
        var trigger = li.querySelector(':scope > a');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDesktop(li) {
        if (!li) return;
        li.classList.remove('lc-open');
        var trigger = li.querySelector(':scope > a');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        if (openDesktopItem === li) openDesktopItem = null;
    }

    function closeAllDesktop() {
        var items = document.querySelectorAll('#lc-desktop-nav .lc-has-dropdown.lc-open');
        items.forEach(function (li) { closeDesktop(li); });
    }

    function bindDesktopNav() {
        var items = document.querySelectorAll('#lc-desktop-nav .lc-has-dropdown');

        items.forEach(function (li) {
            var delay = parseInt(li.getAttribute('data-hover-delay') || HOVER_DELAY_MS, 10);

            /* Mouse enter: open after delay */
            li.addEventListener('mouseenter', function () {
                clearTimeout(closeTimer);
                hoverTimer = setTimeout(function () {
                    openDesktop(li);
                }, delay);
            });

            /* Mouse leave: close after short delay (allows moving to dropdown) */
            li.addEventListener('mouseleave', function () {
                clearTimeout(hoverTimer);
                closeTimer = setTimeout(function () {
                    closeDesktop(li);
                }, 100);
            });

            /* Keep open when mouse enters the dropdown itself */
            var dropdown = li.querySelector('.lc-dropdown');
            if (dropdown) {
                dropdown.addEventListener('mouseenter', function () {
                    clearTimeout(closeTimer);
                });
                dropdown.addEventListener('mouseleave', function () {
                    closeTimer = setTimeout(function () {
                        closeDesktop(li);
                    }, 100);
                });
            }

            /* Keyboard: Enter / Space toggles */
            var trigger = li.querySelector(':scope > a');
            if (trigger) {
                trigger.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (li.classList.contains('lc-open')) {
                            closeDesktop(li);
                        } else {
                            openDesktop(li);
                        }
                    }
                    if (e.key === 'Escape') {
                        closeDesktop(li);
                        trigger.focus();
                    }
                });
            }
        });

        /* Close when clicking outside */
        document.addEventListener('click', function (e) {
            if (!e.target.closest('#lc-desktop-nav')) {
                closeAllDesktop();
            }
        });

        /* Close on Escape */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAllDesktop();
        });
    }

    /* ── MOBILE DRAWER ───────────────────────────────────────────────── */

    function openDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.classList.add('is-open');
        menuTrigger.classList.add('is-open');
        menuTrigger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('is-open');
        menuTrigger.classList.remove('is-open');
        menuTrigger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function bindMobileDrawer() {
        if (!menuTrigger || !drawer) return;

        menuTrigger.addEventListener('click', function () {
            if (drawer.classList.contains('is-open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeDrawer);
        }

        if (overlay) {
            overlay.addEventListener('click', closeDrawer);
        }

        /* Keyboard trap: Escape closes drawer */
        drawer.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeDrawer();
                menuTrigger.focus();
            }
        });
    }

    /* ── MOBILE ACCORDION ────────────────────────────────────────────── */

    function bindMobileAccordion() {
        var items = document.querySelectorAll('.lc-mobile-nav .lc-mob-has-sub > a');

        items.forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                /* Only intercept if sub-menu exists */
                var li = trigger.closest('.lc-mob-has-sub');
                if (!li) return;

                var isOpen = li.classList.contains('lc-mob-open');

                /* Close all open items first */
                document.querySelectorAll('.lc-mobile-nav .lc-mob-has-sub.lc-mob-open')
                    .forEach(function (openLi) {
                        openLi.classList.remove('lc-mob-open');
                    });

                /* Toggle the clicked item */
                if (!isOpen) {
                    li.classList.add('lc-mob-open');
                    e.preventDefault(); /* prevent navigation when opening */
                }
                /* If it was open, user navigates to the href — no preventDefault */
            });
        });
    }

    /* ── INIT ────────────────────────────────────────────────────────── */

    function init() {
        header      = document.getElementById('lc-header');
        menuTrigger = document.getElementById('lc-menu-trigger');
        drawer      = document.getElementById('lc-mobile-drawer');
        overlay     = document.getElementById('lc-drawer-overlay');
        closeBtn    = drawer ? drawer.querySelector('.lc-drawer-close') : null;

        if (!header) return; // components not injected yet

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        bindDesktopNav();
        bindMobileDrawer();
        bindMobileAccordion();
    }

    /* Wait for lc-components.js to finish injecting the HTML */
    document.addEventListener('lc:components:ready', init);

    /* Fallback: if components are already present (e.g., static inline header) */
    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('lc-header')) {
            init();
        }
    });

}());
