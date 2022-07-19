import { WebDriverBroswer } from '@data/protocols/web/driver'
import { GameAnalitcs } from '@domain/useCases/bot/analitcs/game'
import { ServerMetrics } from '@domain/useCases/bot/server/metrics'
import { By, Key } from 'selenium-webdriver'

export class BotServerMetrics implements ServerMetrics {
  constructor(
    private readonly webDriverBroswer: WebDriverBroswer,
    private readonly gameAnalitcs: GameAnalitcs
  ) {}

  public async onStartServerMetrics(): Promise<void> {
    try {
      const { pages } = this.loadParams()
      const driver = await this.webDriverBroswer.onCreateDriver()
      await driver.get(pages.crash)
      this.gameAnalitcs.onAnalitcsGameByType({ driver, gameType: 'crash' })
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    }
  }

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
