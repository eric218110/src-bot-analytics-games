import { Controller } from '@domain/http/controller'
import { MetricsLoad } from '@domain/useCases/metrics/load'

export class MetricsLoadController implements Controller {
  constructor(private readonly metricsLoad: MetricsLoad) {}

  public handler(params: any): Promise<any> {
    console.log(params.gameType)
    return this.metricsLoad.handlerMetrics(params.gameType)
  }
}
