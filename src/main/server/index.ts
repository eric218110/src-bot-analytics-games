import { config } from 'dotenv'
import express from 'express'
import { adapterRouter } from '@main/adapter/express/router'
import { makeLoginApiController } from '@main/factories/presentation/controller/login/api'

async function main() {
  config()

  const { PORT_APP = 1995 } = process.env

  const app = express()
  app.use(express.json())

  app.post('/login', adapterRouter(makeLoginApiController()))

  app.listen(PORT_APP, () => {
    console.info(`Server running in port: ${PORT_APP}`)
  })
}

main()
