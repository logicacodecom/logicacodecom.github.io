/* Progressive enhancements shared by the static pages. */
(function () {
  'use strict';
  var toggle = document.querySelector('.lc-menu-toggle');
  var nav = document.querySelector('.lc-primary-nav');
  if (toggle && nav) {
    var mobile = window.matchMedia('(max-width: 900px)');
    function closeMenu(returnFocus) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
      nav.hidden = mobile.matches;
      if (returnFocus) toggle.focus();
    }
    function syncMenu() {
      var focusInside = nav.contains(document.activeElement);
      toggle.hidden = !mobile.matches;
      closeMenu(mobile.matches && focusInside);
    }
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close menu' : 'Menu';
      nav.hidden = !open;
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobile.matches && !nav.hidden) closeMenu(true);
    });
    document.addEventListener('click', function (event) {
      if (mobile.matches && !event.target.closest('.lc-site-header')) closeMenu(false);
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });
    mobile.addEventListener('change', syncMenu);
    nav.querySelectorAll('a').forEach(function (link) {
      if (link.pathname === window.location.pathname) link.setAttribute('aria-current', 'page');
    });
    syncMenu();
  }

  var $ = window.jQuery;
  if (!$ || !$.fn.owlCarousel) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.owl-carousel').forEach(function (carousel, index) {
    var $carousel = $(carousel);
    var toggleMotion;
    var playing = false;
    carousel.id = carousel.id || 'lc-carousel-' + (index + 1);
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carousel');
    carousel.setAttribute('aria-label', carousel.dataset.label || 'Featured content ' + (index + 1));
    function pause() {
      playing = false;
      $carousel.trigger('stop.owl.autoplay');
      if (toggleMotion) toggleMotion.textContent = 'Play slides';
    }
    function updateAccessibility() {
      carousel.querySelectorAll('.owl-item').forEach(function (item) {
        var visible = item.classList.contains('active');
        item.setAttribute('aria-hidden', String(!visible));
        item.inert = !visible;
      });
      carousel.querySelectorAll('.owl-dot').forEach(function (dot, i) {
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.setAttribute('aria-current', dot.classList.contains('active') ? 'true' : 'false');
      });
      [['.owl-prev', 'Previous slides'], ['.owl-next', 'Next slides']].forEach(function (entry) {
        var button = carousel.querySelector(entry[0]);
        if (button) {
          button.setAttribute('aria-label', entry[1]);
          button.removeAttribute('role');
        }
      });
      if (!toggleMotion && carousel.dataset.motionControls === 'true') {
        var controls = document.createElement('div');
        controls.className = 'lc-carousel-controls';
        toggleMotion = document.createElement('button');
        toggleMotion.type = 'button';
        toggleMotion.className = 'lc-carousel-toggle';
        toggleMotion.textContent = 'Play slides';
        toggleMotion.setAttribute('aria-controls', carousel.id);
        toggleMotion.addEventListener('click', function () {
          if (playing) { pause(); return; }
          playing = true;
          toggleMotion.textContent = 'Pause slides';
          $carousel.trigger('play.owl.autoplay', [Number(carousel.dataset.autoplayTimeout) || 8000]);
        });
        controls.appendChild(toggleMotion);
        carousel.after(controls);
      }
    }
    $carousel.on('initialized.owl.carousel translated.owl.carousel refreshed.owl.carousel', function () {
      // Owl creates its navigation in its own event handlers; label it afterward.
      window.requestAnimationFrame(updateAccessibility);
    });
    carousel.addEventListener('focusin', pause);
    motion.addEventListener('change', function () { if (motion.matches) pause(); });
    if ($carousel.hasClass('owl-loaded')) updateAccessibility();
  });
})();
