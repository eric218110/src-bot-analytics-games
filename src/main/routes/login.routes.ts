import { adapterRouter } from '@main/adapter/express/router'
import { Router } from 'express'
import { makeLoginApiController } from '@main/factories/presentation/controller/login/api'

export const loginRouter = (router: Router) => {
  router.post('login', adapterRouter(makeLoginApiController()))
}
