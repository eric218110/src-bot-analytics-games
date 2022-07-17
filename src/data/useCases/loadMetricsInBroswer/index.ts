import { MetricsLoad } from '@domain/useCases/metrics/load'
import { WebDriverBroswer } from '@data/protocols/web/driver'
import { By, Key } from 'selenium-webdriver'

export class LoadMetricsInBroswer implements MetricsLoad {
  constructor(private readonly webDriverBroswer: WebDriverBroswer) {}

  public async handlerMetrics(props: MetricsLoad.Props): Promise<void> {
    const { username, password } = props
    try {
      const urlLogin = 'https://blaze.com/pt/?modal=auth&tab=login'
      const driver = await this.webDriverBroswer.onCreateDriver()

      await driver.get(urlLogin)

      await driver
        .findElement(By.xpath(`//input[@name='username']`))
        .sendKeys(username)
      await driver
        .findElement(By.xpath(`//input[@name='password']`))
        .sendKeys(password + Key.ENTER)
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    } finally {
      // await this.webDriverBroswer.onDestroyDriver()
    }
  }
}
