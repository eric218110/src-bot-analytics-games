const { Builder, By } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

(async function hello() {
    let driver;

    try {
        //Browser Setup
        let builder = new Builder().forBrowser('chrome');
        let options = new Options();
        options.headless();                             // run headless Chrome
        options.excludeSwitches(['enable-logging']);    // disable 'DevTools listening on...'
        options.addArguments(['--no-sandbox']);         // not an advised flag but eliminates "DevToolsActivePort file doesn't exist" error.

        driver = await builder.setChromeOptions(options).build();

        // Navigate to Google and get the "Google Search" button text.
        await driver.get('https://www.google.com');
        const btnText = await driver.findElement(By.name('btnI')).getAttribute('value');
        console.log(`Google button text: ${btnText}`);
    } catch (e) {
        console.log(e);
    } finally {
        if (driver) {
            await driver.close();   // helps chromedriver shut down cleanly and delete the "scoped_dir" temp directories that eventually fill up the harddrive.
            await driver.quit();
        }
    }
})();