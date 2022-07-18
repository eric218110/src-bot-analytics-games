import { LoadMetrics } from '@data/useCases/metrics/load'
import { makeLoadMetricsRepository } from '@main/factories/infra/database/repository/metrics/load/makeLoadMetricsRepository'

export const makeOnLoadMetrics = () => {
  const repository = makeLoadMetricsRepository()
  return new LoadMetrics(repository, repository)
}
