import { MetricsLoad } from '@domain/useCases/metrics/load'
import { MetricsRepository } from '@infra/database/repository/metrics'

export class LoadMetrics implements MetricsLoad {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  public handlerMetrics(): Promise<void> {
    return Promise.resolve()
  }
}
