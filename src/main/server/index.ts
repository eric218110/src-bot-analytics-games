import { adapterRouter } from '@main/adapter/express/router'
import { makeBotController } from '@main/factories/presentation/controller/bot/makeBotController'
import { makeLoginApiController } from '@main/factories/presentation/controller/login/api'
import { makeMetricsLoadController } from '@main/factories/presentation/controller/metrics/load'
import { config } from 'dotenv'
import express from 'express'

async function main() {
  config()
  const { PORT_APP = 1995, ROUTER_APPLICATION_PREFIX: prefix = '' } =
    process.env

  const app = express()
  app.use(express.json())

  app.get(`${prefix}bot/start`, adapterRouter(makeBotController()))
  app.post(`${prefix}login`, adapterRouter(makeLoginApiController()))
  app.get(
    `${prefix}analytics/:gameType`,
    adapterRouter(makeMetricsLoadController())
  )

  app.listen(PORT_APP, async () => {
    console.info(`Server running in port: ${PORT_APP}`)
  })
}

main()
