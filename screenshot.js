const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to desktop size
  await page.setViewportSize({ width: 1200, height: 800 });

  try {
    await page.goto('http://localhost:5177', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshot-desktop.png', fullPage: true });
    console.log('Desktop screenshot saved as screenshot-desktop.png');

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshot-mobile.png', fullPage: true });
    console.log('Mobile screenshot saved as screenshot-mobile.png');

  } catch (error) {
    console.error('Error taking screenshot:', error);
  }

  await browser.close();
})();