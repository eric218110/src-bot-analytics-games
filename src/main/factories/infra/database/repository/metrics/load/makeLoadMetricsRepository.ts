import { MetricsRepository } from '@infra/database/repository/metrics'

export const makeLoadMetricsRepository = () => new MetricsRepository()
