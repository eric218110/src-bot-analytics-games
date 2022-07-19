import { BotServerMetrics } from '@data/useCases/bot/server/metrics'
import { makeWebDriverChrome } from '@main/factories/data/bot/driver/makeWebDriverChrome'
import { makeGameAnalits } from '../analitcs/game/makeGameAnalits'

export const makeBotServer = () =>
  new BotServerMetrics(makeWebDriverChrome(), makeGameAnalits())
