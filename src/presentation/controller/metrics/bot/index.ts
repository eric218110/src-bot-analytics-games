import { Controller } from '@domain/http/controller'
import { ServerMetricsCrash } from '@domain/useCases/bot/server/metrics/crash'
import { ServerMetricsDouble } from '@domain/useCases/bot/server/metrics/double'

export class BotController implements Controller {
  constructor(
    private readonly serverMetricsCrash: ServerMetricsCrash,
    private readonly serverMetricsDouble: ServerMetricsDouble
  ) {}

  public async handler(): Promise<any> {
    // this.serverMetricsCrash.onStartServerMetricsCrash()
    this.serverMetricsDouble.onStartServerMetricsDouble()
    return {
      server: 'start'
    }
  }
}
