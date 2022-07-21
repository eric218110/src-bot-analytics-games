import { WebDriverBroswer } from '@data/protocols/web/driver'
import { GameAnalitcs } from '@domain/useCases/bot/analitcs/game'
import { ServerMetricsDouble } from '@domain/useCases/bot/server/metrics/double'

export class BotServerMetricsDouble implements ServerMetricsDouble {
  constructor(
    private readonly webDriverBroswer: WebDriverBroswer,
    private readonly gameAnalitcs: GameAnalitcs
  ) {}

  public async onStartServerMetricsDouble(): Promise<void> {
    try {
      const { METRICS_PAGE_DOUBLE: double = '' } = process.env
      const driver = await this.webDriverBroswer.onCreateDriver()
      await driver.get(double)
      console.log('Start analitcs game double')
      this.gameAnalitcs.onAnalitcsGameByType({ driver, gameType: 'double' })
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    }
  }
}
