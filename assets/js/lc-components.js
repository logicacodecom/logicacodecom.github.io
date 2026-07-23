/**
 * lc-components.js
 * logicacode — Fetches and injects shared header and footer components.
 *
 * Usage: include this script in <head> with defer, BEFORE lc-nav.js.
 * Each page needs two mount points:
 *   <div id="lc-header-mount"></div>   ← top of <body>
 *   <div id="lc-footer-mount"></div>   ← bottom of <body>
 *
 * The script resolves component paths relative to the site root so it
 * works correctly from any subdirectory depth (e.g. /services/page/).
 */

(function () {
    'use strict';

    /**
     * Resolve the absolute path to /components/ regardless of how deep
     * the current page sits in the directory tree.
     * Works on GitHub Pages where there is no server-side includes.
     */
    function resolveComponentPath(filename) {
        // Walk up from current pathname to find the root
        var origin = window.location.origin;
        return origin + '/components/' + filename;
    }

    /**
     * Fetch an HTML fragment and inject it into a mount element.
     * Calls onDone() when complete (or on failure).
     */
    function injectComponent(mountId, filename, onDone) {
        var mount = document.getElementById(mountId);
        if (!mount) {
            if (onDone) onDone();
            return;
        }

        var url = resolveComponentPath(filename);

        fetch(url)
            .then(function (res) {
                if (!res.ok) throw new Error('Failed to load ' + url + ' (' + res.status + ')');
                return res.text();
            })
            .then(function (html) {
                mount.outerHTML = html;
                if (onDone) onDone();
            })
            .catch(function (err) {
                console.warn('[lc-components] ' + err.message);
                if (onDone) onDone();
            });
    }

    /**
     * Mark the currently active nav link based on the page URL.
     * Adds class "lc-active" to the matching <a> in #lc-desktop-nav
     * and "lc-mob-active" in #lc-mobile-nav.
     */
    function markActiveLinks() {
        var path = window.location.pathname.replace(/\/$/, '') || '/';

        var navLinks = document.querySelectorAll(
            '#lc-desktop-nav a, .lc-mobile-nav a'
        );

        navLinks.forEach(function (link) {
            var href = link.getAttribute('href') || '';
            // Normalise: strip trailing slash, strip hash
            var linkPath = href.split('#')[0].replace(/\/$/, '') || '/';

            if (linkPath && path === linkPath) {
                link.classList.add('lc-active');
                // Also mark the parent <li> for the underline indicator
                var parentLi = link.closest('li');
                if (parentLi) parentLi.classList.add('lc-active-item');
            }
        });
    }

    /**
     * Fix all relative image src attributes inside #lc-logo after injection,
     * so the logo resolves correctly from any subdirectory.
     */
    function fixLogoPaths() {
        var logo = document.querySelector('#lc-logo img');
        if (!logo) return;
        var src = logo.getAttribute('src');
        // If already absolute, leave it alone
        if (!src || src.charAt(0) !== '/') return;
        logo.setAttribute('src', window.location.origin + src);
    }

    /* ── BOOT ─────────────────────────────────────────────────────────── */

    document.addEventListener('DOMContentLoaded', function () {

        var headerDone = false;
        var footerDone = false;

        function checkAllDone() {
            if (!headerDone || !footerDone) return;

            fixLogoPaths();
            markActiveLinks();

            // Fire a custom event so lc-nav.js knows the DOM is ready
            document.dispatchEvent(new CustomEvent('lc:components:ready'));
        }

        injectComponent('lc-header-mount', 'header.html', function () {
            headerDone = true;
            checkAllDone();
        });

        injectComponent('lc-footer-mount', 'footer.html', function () {
            footerDone = true;
            checkAllDone();
        });
    });

}());
