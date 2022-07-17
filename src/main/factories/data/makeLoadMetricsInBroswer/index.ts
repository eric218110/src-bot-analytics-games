import { LoadMetricsInBroswer } from '@data/useCases/loadMetricsInBroswer'
import { makeWebDriverChrome } from '@main/factories/main/web/driver/makeWebDriverChrome'

export const makeLoadMetricsInBroswer = () =>
  new LoadMetricsInBroswer(makeWebDriverChrome())
