import { LoginWithApiMethod } from '@data/useCases/api/login'
import { makeHttpClient } from '@main/factories/infra/makeHttpClient'
import { makeSecurityTokenDecoder } from '../security/token/decode/makeSecurityTokenDecoder'

export const makeApiLoginProvider = () =>
  new LoginWithApiMethod(makeHttpClient(), makeSecurityTokenDecoder())
