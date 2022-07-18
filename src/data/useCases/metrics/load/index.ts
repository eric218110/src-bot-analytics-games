import { MetricsLoad } from '@domain/useCases/metrics/load'
import { LoadMetricsGameCrashRepository } from '@data/protocols/repository/metrics/load/crash'
import { LoadMetricsGameDoubleRepository } from '@data/protocols/repository/metrics/load/double'

export class LoadMetrics implements MetricsLoad {
  constructor(
    private readonly loadMetricsGameCrashRepository: LoadMetricsGameCrashRepository,
    private readonly loadMetricsGameDoubleRepository: LoadMetricsGameDoubleRepository
  ) {}

  public async handlerMetrics(gameType = ''): Promise<MetricsLoad.ReturnType> {
    if (gameType.toLocaleLowerCase() === 'double') {
      return await this.loadMetricsGameDoubleRepository.onLoadMetricsDouble()
    }
    if (gameType.toLocaleLowerCase() === 'crash') {
      return await this.loadMetricsGameCrashRepository.onLoadMetricsCrash()
    }
    return {
      error: {
        message: 'gameType is not allowed',
        status: 401
      }
    }
  }
}
