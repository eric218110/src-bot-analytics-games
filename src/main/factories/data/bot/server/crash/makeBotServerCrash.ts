import { BotServerMetricsCrash } from '@data/useCases/bot/server/metrics/crash'
import { makeWebDriverChrome } from '@main/factories/data/bot/driver/makeWebDriverChrome'
import { makeGameAnalits } from '../../analitcs/game/makeGameAnalits'

export const makeBotServerCrash = () =>
  new BotServerMetricsCrash(makeWebDriverChrome(), makeGameAnalits())
