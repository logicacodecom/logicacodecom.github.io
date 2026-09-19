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
      // Jump links (#section) share the page's path but are not the page itself.
      if (link.pathname === window.location.pathname && !link.hash) link.setAttribute('aria-current', 'page');
    });
    syncMenu();
  }

  // Dropdown menus: disclosure buttons. Panels are visible lists until this runs.
  var triggers = document.querySelectorAll('.lc-nav-trigger');
  if (nav && triggers.length) {
    function setOpen(trigger, open) {
      trigger.setAttribute('aria-expanded', String(open));
      document.getElementById(trigger.getAttribute('aria-controls')).hidden = !open;
    }
    function closeAll(except) {
      triggers.forEach(function (t) { if (t !== except) setOpen(t, false); });
    }
    triggers.forEach(function (trigger) {
      setOpen(trigger, false);
      trigger.addEventListener('click', function () {
        var open = trigger.getAttribute('aria-expanded') !== 'true';
        closeAll(trigger);
        setOpen(trigger, open);
      });
    });
    nav.classList.add('lc-nav-enhanced');
    // Capture phase: Escape closes an open panel before it closes the small-screen menu.
    document.addEventListener('keydown', function (event) {
      var open = event.key === 'Escape' && nav.querySelector('.lc-nav-trigger[aria-expanded="true"]');
      if (!open) return;
      setOpen(open, false);
      open.focus();
      event.stopImmediatePropagation();
    }, true);
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.lc-nav-item') || event.target.closest('.lc-mega a')) closeAll();
    });
  }

  // In-page scroll links (theme.js animates the scroll) also move keyboard focus to their target,
  // so the next Tab continues from the section the visitor jumped to.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a.page-scroll[href^="#"]');
    var target = link && link.hash.length > 1 && document.getElementById(link.hash.slice(1));
    if (!target) return;
    if (!target.matches('a, button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  // Homepage sections fade in as they enter the viewport (skipped when reduced motion is preferred).
  var reveals = document.querySelectorAll('.lc-reveal');
  if (reveals.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('lc-js');
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('lc-in'); revealer.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { revealer.observe(el); });
  }

  // "Request a free AI call" links preselect the form topic. A call request needs only name and email.
  var topic = document.getElementById('contact-topic');
  var callNote = document.getElementById('lc-form-note');
  if (topic && callNote) {
    var subject = document.getElementById('contact-subject');
    var message = document.getElementById('contact-message');
    var messageLabel = document.querySelector('label[for="contact-message"]');
    var CALL = 'AI Opportunity Call';
    var CALL_SUBJECT = 'Free AI opportunity call';
    var defaults = { placeholder: message.placeholder, label: messageLabel.textContent, note: callNote.innerHTML };
    var syncTopic = function () {
      var call = topic.value === CALL;
      if (call && !subject.value) subject.value = CALL_SUBJECT;
      if (!call && subject.value === CALL_SUBJECT) subject.value = '';
      message.required = !call;
      message.placeholder = call ? 'Which workflow would you like to look at? (optional)' : defaults.placeholder;
      messageLabel.textContent = call ? 'Your Message (optional)' : defaults.label;
      callNote.innerHTML = call ? '<em>Only your name and email are needed. We reply within two business days to arrange a time for the call.</em>' : defaults.note;
    };
    topic.addEventListener('change', syncTopic);
    document.querySelectorAll('[data-topic]').forEach(function (link) {
      link.addEventListener('click', function () { topic.value = link.getAttribute('data-topic'); syncTopic(); });
    });
  }

  var $ = window.jQuery;
  if (!$ || !$.fn.owlCarousel) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.owl-carousel').forEach(function (carousel, index) {
    var $carousel = $(carousel);
    carousel.id = carousel.id || 'lc-carousel-' + (index + 1);
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carousel');
    carousel.setAttribute('aria-label', carousel.dataset.label || 'Featured content ' + (index + 1));
    function pause() {
      $carousel.trigger('stop.owl.autoplay');
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
