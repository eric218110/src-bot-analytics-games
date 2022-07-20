import { MetricsRepository } from '@infra/database/repository/metrics/load'

export const makeLoadMetricsRepository = () => new MetricsRepository()
