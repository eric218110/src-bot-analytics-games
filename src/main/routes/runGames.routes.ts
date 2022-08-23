import { adapterRouter } from '@main/adapter/express/router'
import express from 'express'
import { makeRunGameDoubleController } from '@main/factories/presentation/controller/run/game/double/load'

export const gameDoubleRouter = () => {
  const router = express.Router()
  router.post('game/double', adapterRouter(makeRunGameDoubleController()))
}
