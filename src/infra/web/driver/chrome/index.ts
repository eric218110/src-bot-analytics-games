import { WebDriverBroswer } from '@data/protocols/web/driver'
import { WebDriver as WebDriverSelenium } from 'selenium-webdriver'
import { Builder } from 'selenium-webdriver'
import { makeOptionsBroswerChorome } from './options'

export class WebDriverChrome implements WebDriverBroswer {
  private driver: WebDriverSelenium

  public async onCreateDriver(): WebDriverBroswer.ReturnType {
    const builder = new Builder().forBrowser('chrome')

    this.driver = await builder
      .setChromeOptions(makeOptionsBroswerChorome())
      .build()

    return this.driver
  }

  public async onDestroyDriver(): Promise<void> {
    if (this.driver) {
      await this.driver.close()
      await this.driver.quit()
    }
  }
}
