import { GamerRunnerDouble } from '@data/useCases/bot/run/game/double'
import { makeWebDriverChrome } from '@main/factories/data/bot/driver/makeWebDriverChrome'

export const makeRunGameDouble = () =>
  new GamerRunnerDouble(makeWebDriverChrome())
