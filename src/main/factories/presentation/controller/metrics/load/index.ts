import { makeOnLoadMetrics } from '@main/factories/data/api/metrics/load/makeOnLoadMetrics'
import { MetricsLoadController } from '@presentantion/controller/metrics/load'

export const makeMetricsLoadController = () => {
  return new MetricsLoadController(makeOnLoadMetrics())
}
