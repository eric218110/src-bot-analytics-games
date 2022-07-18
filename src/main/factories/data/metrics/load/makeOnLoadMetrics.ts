import { LoadMetrics } from '@data/useCases/metrics/load'
import { makeLoadMetricsRepository } from '@main/factories/infra/database/repository/metrics/load/makeLoadMetricsRepository'

export const makeOnLoadMetrics = () =>
  new LoadMetrics(makeLoadMetricsRepository())
