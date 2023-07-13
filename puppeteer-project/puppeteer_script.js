const puppeteer = require('puppeteer');

(async () => {
  // Launch headful browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Go to swap.defillama.com
    await page.goto('https://swap.defillama.com');

    // Wait for the form to load
    await page.waitForSelector('.swap-form', { visible: true });

    // Fill the form
    await page.type('input[name="chain"]', 'Arbitrum One');
    await page.type('input[name="sell_amount"]', '12');
    await page.type('.token-input-wrap input', 'WBTC');
    await page.waitForSelector('.token-list-item');
    await page.click('.token-list-item');

    // Wait for the "You Buy" section to appear
    await page.waitForSelector('.swap-form-you-buy', { visible: true });

    // Fill the "You Buy" section
    await page.type('.token-input-wrap input', 'USDC');
    await page.waitForSelector('.token-list-item');
    await page.click('.token-list-item');

    // Wait for the "Select a route to perform a swap" section to appear
    await page.waitForSelector('.route-list', { visible: true });

    // Select the second option
    const routeOptions = await page.$$('.route-list-item');
    await routeOptions[1].click();

    // Take a screenshot of the page after filling the form
    await page.screenshot({ path: 'form_filled.png' });

    // Do something with the form data or perform further actions

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
