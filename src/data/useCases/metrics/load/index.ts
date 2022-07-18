import { MetricsLoad } from '@domain/useCases/metrics/load'
import { MetricsRepository } from '@infra/database/repository/metrics'

export class LoadMetrics implements MetricsLoad {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  public async handlerMetrics(
    gameType: string
  ): Promise<MetricsLoad.ReturnType> {
    return await this.metricsRepository.onLoadMetrics(gameType)
  }
}
