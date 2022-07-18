import { adapterRouter } from '@main/adapter/express/router'
import express from 'express'
import { makeMetricsLoadController } from '@main/factories/presentation/controller/metrics/load'
import { logRouterPath } from './log'

export const metricsRouter = () => {
  const router = express.Router()
  router.get('analytics/:gameType', adapterRouter(makeMetricsLoadController()))
  logRouterPath('analytics/:gameType', 'GET')
}
