import { GamerRunnerDouble } from '@data/useCases/bot/run/game/double'
import { makeWebDriverChrome } from '@main/factories/data/bot/driver/makeWebDriverChrome'

const gamerRunnerDouble = new GamerRunnerDouble(makeWebDriverChrome())

export const makeRunOrDestroyGameDouble = () => gamerRunnerDouble
