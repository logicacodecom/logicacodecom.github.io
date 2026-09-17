// Run with the Playwright browser tool's filename argument while the local
// preview is serving on port 8765. Every form request is intercepted.
async (page) => {
  const origin = 'http://127.0.0.1:8765';
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const results = [];
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // Disable browser caching so repeated local runs use the current styles/scripts.
  await page.route('**/*', route => route.continue());
  for (const path of ['/', '/services.html', '/about-us.html', '/contact.html', '/services/ai-automation.html']) {
    const p = await page.context().newPage();
    const errors = [];
    p.on('pageerror', error => errors.push(error.message));
    for (const width of [1440, 768, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      const response = await p.goto(origin + path);
      assert(response.status() === 200, path + ' did not load');
      await p.evaluate(() => document.fonts.ready);
      await p.waitForFunction(() => [...document.querySelectorAll('.owl-carousel')].every(carousel =>
        carousel.classList.contains('owl-loaded') && [...carousel.querySelectorAll('.owl-nav button, .owl-dot')].every(button =>
          button.getAttribute('aria-label') && button.getAttribute('role') !== 'presentation')));
      await p.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js' });
      const audit = await p.evaluate(async () => {
        const violations = (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] } })).violations;
        const overflow = [...document.querySelectorAll('main .btn, main h1, main h2, form, .lc-site-header')].filter(element => {
          if (element.closest('.owl-item:not(.active)')) return false;
          const rect = element.getBoundingClientRect();
          return rect.width && (rect.right > innerWidth + 1 || rect.left < -1);
        }).map(element => element.textContent.trim().slice(0, 60));
        return {
          violations: violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })),
          overflow,
          mains: document.querySelectorAll('main').length,
          footers: document.querySelectorAll('#footer').length,
          brokenImages: [...document.images].filter(image => image.src && image.complete && !image.naturalWidth).map(image => image.src)
        };
      });
      assert(!audit.violations.length, path + ' at ' + width + ': ' + JSON.stringify(audit.violations));
      assert(!audit.overflow.length, path + ' overflow at ' + width + ': ' + audit.overflow.join(', '));
      assert(audit.mains === 1 && audit.footers === 1, 'Incorrect landmarks: ' + path);
      assert(!audit.brokenImages.length, 'Broken image: ' + audit.brokenImages.join(', '));
    }
    await p.getByRole('button', { name: 'Menu', exact: true }).click();
    assert(await p.locator('#lc-primary-nav').isVisible(), 'Mobile menu did not open');
    await p.keyboard.press('Tab');
    await p.keyboard.press('Escape');
    assert(!await p.locator('#lc-primary-nav').isVisible(), 'Escape did not close menu');
    assert(await p.locator('.lc-menu-toggle').evaluate(e => e === document.activeElement), 'Menu focus was not restored');
    assert(!errors.length, path + ': ' + errors.join(', '));
    results.push({ path, widths: [1440, 768, 390, 320], accessibility: 'pass', menu: 'pass', errors });
    await p.close();
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin);
  await page.locator('.lc-carousel-toggle').first().waitFor();
  const rotating = () => page.evaluate(() => [...document.querySelectorAll('.owl-carousel')].some(e => jQuery(e).data('owl.carousel').is('rotating')));
  assert(!await rotating(), 'Carousel started automatically');
  await page.locator('.lc-carousel-toggle').first().click();
  assert(await page.locator('.lc-carousel-toggle').first().textContent() === 'Pause slides', 'Play control did not update');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.lc-carousel-toggle').first().filter({ hasText: 'Play slides' }).waitFor();
  assert(!await rotating(), 'Reduced motion did not stop autoplay');
  await page.locator('#lc-carousel-1 .owl-next').click({ timeout: 5000 });
  await page.locator('#lc-carousel-1 .owl-item.active').first().waitFor();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  results.push({ carousel: 'starts paused, explicit playback, reduced-motion stop, next control' });

  for (const path of ['/', '/contact.html']) {
    const p = await page.context().newPage();
    await p.goto(origin + path);
    const fill = async () => {
      await p.locator('#contact-name').fill('Test — علي 日本語 🧪');
      await p.locator('#contact-email').fill('audit@example.com');
      if (await p.locator('#contact-subject').count()) await p.locator('#contact-subject').fill('Intercepted local test');
      await p.locator('#contact-topic').selectOption({ index: 1 });
      await p.locator('#contact-message').fill('Browser regression check. This request must never be delivered.');
    };
    const endpoint = 'https://api.web3forms.com/submit';
    let requests = 0;
    let resolveRoute;
    const captured = new Promise(resolve => { resolveRoute = resolve; });
    await p.route(endpoint, route => { requests++; resolveRoute(route); });
    await fill();
    await p.locator('button[type=submit]').click();
    const pendingRoute = await captured;
    assert(await p.locator('button[type=submit]').isDisabled(), 'Submit was not disabled');
    assert((await p.locator('#form-status').textContent()).includes('Sending'), 'Missing pending feedback');
    await p.evaluate(() => { for (let i = 0; i < 5; i++) jQuery('#contact-form-web3').trigger('submit'); });
    assert(requests === 1, 'Duplicate requests were sent');
    await pendingRoute.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    await p.locator('#form-status').filter({ hasText: 'Message sent.' }).waitFor();
    assert(!await p.locator('button[type=submit]').isDisabled(), 'Submit did not recover after success');
    assert(await p.locator('#contact-message').inputValue() === '', 'Successful form did not reset');
    await p.unroute(endpoint);
    for (const scenario of ['rejected', 'server-error', 'network-error']) {
      await p.route(endpoint, route => scenario === 'network-error' ? route.abort() : route.fulfill({ status: scenario === 'server-error' ? 503 : 200, contentType: 'application/json', body: JSON.stringify({ success: false }) }));
      await fill();
      await p.locator('button[type=submit]').click();
      await p.locator('#form-status').filter({ hasText: scenario === 'rejected' ? 'not accepted' : 'could not confirm' }).waitFor();
      assert(!await p.locator('button[type=submit]').isDisabled(), 'Submit did not recover: ' + scenario);
      assert((await p.locator('#contact-message').inputValue()).includes('regression'), 'Input was lost: ' + scenario);
      await p.unroute(endpoint);
    }
    await p.close();
    results.push({ form: path, scenarios: ['pending', 'duplicate prevention', 'success/reset', 'rejection', 'server error', 'network error', 'retry', 'Unicode input'], delivery: 'all intercepted' });
  }
  return results;
}
