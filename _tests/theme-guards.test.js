/*
 * Regression test for the P0 lead-capture bug (see MARKETING-AUDIT.md).
 *
 * theme.js is shared by pages that load different subsets of the vendor stack.
 * It used to call optional jQuery plugins unguarded at the top level of its IIFE,
 * so any page missing one of those scripts threw a TypeError and aborted the
 * rest of the file -- including the Web3Forms submit handler. contact.html and
 * services/ai-automation.html both hit this, and every lead was silently lost.
 *
 * This test runs theme.js twice against a stub jQuery: once with NO plugins
 * (the contact.html case) and once with ALL of them (the index.html case).
 * The contract is that the contact form binds either way.
 *
 * Run: node _tests/theme-guards.test.js
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const THEME_JS = path.join(__dirname, '..', 'assets', 'js', 'theme.js');

// Plugins theme.js calls at load time. Absent => the guards must skip them.
const PLUGINS = [
	'mb_YTPlayer',   // ytplayer      - the original crash
	'owlCarousel',   // owl-carousel  - killed both carousels on ai-automation.html
	'imagesLoaded',  // imagesloaded  - isotope dependency
	'isotope',       // isotope
	'magnificPopup', // magnific-popup
	'counterUp',     // counterup
	'tooltip',       // bootstrap     - contact.html loads no bootstrap JS
	'popover'        // bootstrap
];

function runTheme({ withPlugins }) {
	const calls = [];        // every jQuery method invoked
	const events = [];       // every .on(event) binding
	const loadHandlers = []; // window load callbacks, invoked after the IIFE

	const label = (sel) =>
		typeof sel === 'string' ? sel : sel && sel.__name ? sel.__name : 'object';

	function makeChain(sel) {
		return new Proxy(function () {}, {
			get(_target, prop) {
				if (typeof prop === 'symbol') return undefined;
				if (prop === 'length') return 0;

				calls.push(String(prop));

				// Faithful to the browser: an unloaded plugin is simply undefined,
				// so calling it throws TypeError and aborts theme.js's IIFE.
				// This is what actually killed the contact form in production.
				if (PLUGINS.includes(String(prop)) && !$.fn[String(prop)]) return undefined;

				switch (prop) {
					case 'ready':
						return (cb) => { cb(); return makeChain(sel); };
					case 'on':
						return (evt, handler) => {
							events.push({ sel: label(sel), evt });
							if (label(sel) === 'window' && evt === 'load' && typeof handler === 'function') {
								loadHandlers.push(handler);
							}
							return makeChain(sel);
						};
					// Must actually invoke the callback: the owlCarousel and isotope
					// init calls live inside these, so a no-op stub would hide them.
					case 'each':
						return (cb) => {
							const el = { __name: 'element' };
							if (typeof cb === 'function') cb.call(el, 0, el);
							return makeChain(sel);
						};
					case 'imagesLoaded':
						return (cb) => {
							if (typeof cb === 'function') cb();
							return makeChain(sel);
						};
					case 'hasClass':
						return () => false;
					case 'attr':
					case 'data':
						return () => '';
					case 'offset':
						return () => ({ top: 0 });
					case 'get':
						return () => ({ files: null, value: '' });
					default:
						return () => makeChain(sel);
				}
			}
		});
	}

	const windowObj = {
		__name: 'window',
		onload: null,
		innerHeight: 800,
		addEventListener() {}
	};
	const documentObj = {
		__name: 'document',
		querySelector: () => ({ offsetHeight: 100 }),
		documentElement: { style: {} },
		getElementsByTagName: () => [],
		getElementsByClassName: () => []
	};

	const $ = (sel) => makeChain(sel);
	$.fn = {};
	$.easing = {};            // no easing plugin -> exercises the scrollEasing fallback
	$.ajax = () => ({ done: () => {} });

	if (withPlugins) {
		PLUGINS.forEach((name) => { $.fn[name] = function () { return this; }; });
		$.easing.easeInOutExpo = () => 0;
		$.magnificPopup = { close() {} };
	}

	const sandbox = {
		jQuery: $,
		window: windowObj,
		document: documentObj,
		navigator: { userAgent: 'node' },
		console,
		alert: () => {},
		Array
	};

	let crashed = null;
	try {
		vm.runInNewContext(fs.readFileSync(THEME_JS, 'utf8'), sandbox, { filename: 'theme.js' });
		loadHandlers.forEach((cb) => cb());
	} catch (err) {
		crashed = err;
	}

	return { calls, events, crashed };
}

function boundContactForm(events) {
	return events.some((e) => e.sel === '#contact-form-web3' && e.evt === 'submit');
}

// --- Scenario A: contact.html -- jQuery only, no plugins at all ---------------
const bare = runTheme({ withPlugins: false });

assert.ok(
	!bare.crashed,
	'REGRESSION: theme.js threw with no plugins loaded -- ' +
	(bare.crashed && bare.crashed.message) +
	'\nThis aborts the IIFE, so everything below it never runs.'
);

assert.ok(
	boundContactForm(bare.events),
	'REGRESSION: the Web3Forms submit handler did not bind without plugins loaded. ' +
	'Leads submitted on /contact.html are being silently discarded.'
);

PLUGINS.forEach((name) => {
	assert.ok(
		!bare.calls.includes(name),
		`Guard missing: theme.js called ${name}() even though the plugin was absent.`
	);
});

// --- Scenario B: index.html -- full vendor stack ------------------------------
const full = runTheme({ withPlugins: true });

assert.ok(
	boundContactForm(full.events),
	'The contact form must still bind when every plugin is present.'
);

PLUGINS.forEach((name) => {
	assert.ok(
		full.calls.includes(name),
		`Guard too aggressive: ${name}() was skipped even though the plugin was loaded.`
	);
});

console.log(`PASS  form binds with 0 plugins and with ${PLUGINS.length}/${PLUGINS.length} plugins`);
console.log(`      guarded: ${PLUGINS.join(', ')}`);
