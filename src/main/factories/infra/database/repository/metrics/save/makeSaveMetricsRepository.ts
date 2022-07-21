import { MetricsSaveRepository } from '@infra/database/repository/metrics/save'

export const makeSaveMetricsRepository = () => new MetricsSaveRepository()
