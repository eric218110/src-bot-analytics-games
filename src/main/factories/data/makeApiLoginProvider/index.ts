import { LoginWithApiMethod } from '@data/useCases/api/login'
import { makeHttpClient } from '@main/factories/infra/makeHttpClient'

export const makeApiLoginProvider = () =>
  new LoginWithApiMethod(makeHttpClient())
