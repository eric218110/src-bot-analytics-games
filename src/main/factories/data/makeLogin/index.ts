import { Login } from '@data/useCases/login'
import { makeWebDriverChrome } from '@main/factories/main/web/driver/makeWebDriverChrome'
import { makeSecurityTokenDecoder } from '../security/token/decode/makeSecurityTokenDecoder'

export const makeLogin = () =>
  new Login(makeWebDriverChrome(), makeSecurityTokenDecoder())
