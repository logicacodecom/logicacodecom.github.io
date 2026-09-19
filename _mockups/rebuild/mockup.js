/* MOCKUP ONLY: disclosure dropdowns for the new header. Would move into site.js. */
(function () {
  'use strict';
  var triggers = document.querySelectorAll('.lc-nav-trigger');
  function setOpen(trigger, open) {
    trigger.setAttribute('aria-expanded', String(open));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !open;
  }
  function closeAll(except) {
    triggers.forEach(function (t) { if (t !== except) setOpen(t, false); });
  }
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var open = trigger.getAttribute('aria-expanded') !== 'true';
      closeAll(trigger);
      setOpen(trigger, open);
    });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var open = document.querySelector('.lc-nav-trigger[aria-expanded="true"]');
    if (open) { setOpen(open, false); open.focus(); event.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.lc-nav-item')) closeAll();
  });
  // Review aid: ?menu=services opens that panel on load (for screenshots).
  var preset = new URLSearchParams(location.search).get('menu');
  var presetTrigger = preset && document.querySelector('[aria-controls="lc-menu-' + preset + '"]');
  if (presetTrigger) {
    var toggle = document.querySelector('.lc-menu-toggle');
    if (toggle && !toggle.hidden) toggle.click();
    setOpen(presetTrigger, true);
  }
})();
