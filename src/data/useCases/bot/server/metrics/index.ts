import { HttpClient } from '@data/protocols/http/client'
import { WebDriverBroswer } from '@data/protocols/web/driver'
import { ServerMetrics } from '@domain/useCases/bot/server/metrics'
import { By, Key } from 'selenium-webdriver'

export class BotServerMetrics implements ServerMetrics {
  constructor(private readonly webDriverBroswer: WebDriverBroswer) {}

  public async onStartServerMetrics(): Promise<void> {
    try {
      const { pages } = this.loadParams()

      const driver = await this.webDriverBroswer.onCreateDriver()
      await driver.get(pages.login)
      await this.onLoginOnScrapingInputParams(driver)
      await driver.get(pages.crash)
      // setTimeout(() => {
      //   driver.get(pages.crash)
      // }, 2000)
    } catch (error) {
      // console.error(error)
      // await this.webDriverBroswer.onDestroyDriver()
      // throw new Error(error)
    } finally {
      // await this.webDriverBroswer.onDestroyDriver()
    }
  }

  // private async onAnalitcsResultsInGameCrash() {}

  private async onLoginOnScrapingInputParams(driver: any) {
    const { username, password } = this.loadParams()
    await driver
      .findElement(By.xpath(`//input[@name='username']`))
      .sendKeys(username)

    await driver
      .findElement(By.xpath(`//input[@name='password']`))
      .sendKeys(password + Key.ENTER)
  }

  private loadParams() {
    const {
      URL_LOGIN_API: url = '',
      METRICS_USERNAME: username = '',
      METRICS_PASSWORD: password = '',
      METRICS_PAGE_LOGIN: login = '',
      METRICS_PAGE_HOME: home = '',
      METRICS_PAGE_DOUBLE: double = '',
      METRICS_PAGE_CRASH: crash = ''
    } = process.env

    return {
      username,
      password,
      pages: {
        login,
        home,
        double,
        crash
      },
      url
    }
  }
}
