import { MetricsLoad } from '@domain/useCases/metrics/load'
import { WebDriverBroswer } from '@data/protocols/web/driver'
import { By } from 'selenium-webdriver'

export class LoadMetricsInBroswer implements MetricsLoad {
  constructor(private readonly webDriverBroswer: WebDriverBroswer) {}

  public async handlerMetrics(): Promise<void> {
    try {
      const driver = await this.webDriverBroswer.onCreateDriver()

      await driver.get('https://www.google.com')

      const btnText = await driver
        .findElement(By.name('btnI'))
        .getAttribute('value')

      console.log(`Google button text: ${btnText}`)
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    } finally {
      await this.webDriverBroswer.onDestroyDriver()
    }
  }
}
