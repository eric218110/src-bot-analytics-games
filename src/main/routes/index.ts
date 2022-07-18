import { loginRouter } from './login.routes'
import { metricsRouter } from './metrics.routes'
import express, { Application } from 'express'

export const routes = (app: Application) => {
  const { ROUTER_APPLICATION_PREFIX = '' } = process.env

  const router = express.Router()

  app.use(ROUTER_APPLICATION_PREFIX, loginRouter)
  app.use(ROUTER_APPLICATION_PREFIX, metricsRouter)

  return router
}
