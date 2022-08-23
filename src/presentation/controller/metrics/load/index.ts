import { Controller } from '@domain/http/controller'
import { HttpRequest } from '@domain/http/request'
import { MetricsLoad } from '@domain/useCases/api/metrics/load'

export class MetricsLoadController implements Controller {
  constructor(private readonly metricsLoad: MetricsLoad) {}

  public handler({ params }: HttpRequest<any>): Promise<any> {
    return this.metricsLoad.handlerMetrics(params.gameType)
  }
}
