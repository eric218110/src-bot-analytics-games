import { LoginWithApiMethod } from '@data/useCases/api/login'
import { makeHttpClient } from '@main/factories/infra/http/client/makeHttpClient'
import { makeSecurityTokenDecoder } from '@main/factories/data/api/security/token/decode/makeSecurityTokenDecoder'

export const makeApiLoginProvider = () =>
  new LoginWithApiMethod(makeHttpClient(), makeSecurityTokenDecoder())
