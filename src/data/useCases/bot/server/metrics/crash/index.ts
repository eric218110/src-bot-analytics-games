import { WebDriverBroswer } from '@data/protocols/web/driver'
import { GameAnalitcs } from '@domain/useCases/bot/analitcs/game'
import { ServerMetricsCrash } from '@domain/useCases/bot/server/metrics/crash'

export class BotServerMetricsCrash implements ServerMetricsCrash {
  constructor(
    private readonly webDriverBroswer: WebDriverBroswer,
    private readonly gameAnalitcs: GameAnalitcs
  ) {}

  public async onStartServerMetricsCrash(): Promise<void> {
    try {
      const { METRICS_PAGE_CRASH: crash = '' } = process.env
      const driver = await this.webDriverBroswer.onCreateDriver()
      await driver.get(crash)
      console.log('Start analitcs game crash')
      this.gameAnalitcs.onAnalitcsGameByType({ driver, gameType: 'crash' })
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    }
  }
}
