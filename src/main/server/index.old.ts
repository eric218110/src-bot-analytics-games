import { Builder, By, WebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

async function main() {
  let driver: WebDriver | undefined

  try {
    const builder = new Builder().forBrowser('chrome')
    const options = new Options()
    // options.headless() // run headless Chrome
    options.excludeSwitches(['enable-logging'] as any) // disable 'DevTools listening on...'
    options.addArguments(['--no-sandbox'] as any) // not an advised flag but eliminates "DevToolsActivePort file doesn't exist" error.

    driver = await builder.setChromeOptions(options).build()

    // Navigate to Google and get the "Google Search" button text.
    await driver.get('https://www.google.com')
    const btnText = await driver
      .findElement(By.name('btnI'))
      .getAttribute('value')
    console.info(`Google button text: ${btnText}`)
  } catch (e) {
    console.info(e)
  } finally {
    if (driver) {
      await driver.close() // helps chromedriver shut down cleanly and delete the "scoped_dir" temp directories that eventually fill up the harddrive.
      await driver.quit()
    }
  }
}

main()
