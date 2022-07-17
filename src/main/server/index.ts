import { makeLoadMetricsInBroswer } from '@main/factories/data/makeLoadMetricsInBroswer'
import { config } from 'dotenv'

async function main() {
  config()
  await makeLoadMetricsInBroswer().handlerMetrics()
}

main()
