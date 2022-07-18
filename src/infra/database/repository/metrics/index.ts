import { LoadMetricsRepository } from '@data/protocols/repository/metrics/load'

export class MetricsRepository implements LoadMetricsRepository {
  public onLoadMetrics(): Promise<void> {
    return Promise.resolve()
  }
}
