import { makeApiLoginProvider } from '@main/factories/data/api/makeApiLoginProvider'
import { LoginApiController } from '@presentantion/controller/login/api'

export const makeLoginApiController = (): LoginApiController => {
  return new LoginApiController(makeApiLoginProvider())
}
