import { Login } from '@data/useCases/login'
import { makeWebDriverChrome } from '@main/factories/main/web/driver/makeWebDriverChrome'

export const makeLogin = () => new Login(makeWebDriverChrome())
