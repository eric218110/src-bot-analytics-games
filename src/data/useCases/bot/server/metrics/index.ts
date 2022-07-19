import { WebDriverBroswer } from '@data/protocols/web/driver'
import { ServerMetrics } from '@domain/useCases/bot/server/metrics'
import { By, Key } from 'selenium-webdriver'

export class BotServerMetrics implements ServerMetrics {
  constructor(private readonly webDriverBroswer: WebDriverBroswer) {}

  public async onStartServerMetrics(): Promise<void> {
    try {
      const { pages } = this.loadParams()
      const driver = await this.webDriverBroswer.onCreateDriver()
      await driver.get(pages.crash)
      this.onAnalitcsResultsInGameCrash(driver)
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    }
  }

  private async onAnalitcsResultsInGameCrash(driver: any) {
    let items: Array<string> = []

    setInterval(async () => {
      const children = (await driver.executeScript(() => {
        return document
          .querySelector('.entries')
          ?.textContent?.split('X')
          .filter((x) => x !== '')
      })) as Array<string>
      if (children.length > items.length) {
        items = children
        const lastItemToAdd = await driver
          .findElement(
            By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')
          )
          .getText()
        console.log(`Ultimo resultado ${lastItemToAdd}`)
      }
    }, 1000)
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
