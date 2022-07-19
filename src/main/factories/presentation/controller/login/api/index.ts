import { makeApiLoginProvider } from '@main/factories/data/api/makeApiLoginProvider'
import { LoginApiController } from '@presentantion/controller/login/api'

export const makeLoginApiController = () => {
  return new LoginApiController(makeApiLoginProvider())
}
