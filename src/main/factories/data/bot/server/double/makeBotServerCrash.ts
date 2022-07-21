import { BotServerMetricsDouble } from '@data/useCases/bot/server/metrics/double'
import { makeWebDriverChrome } from '@main/factories/data/bot/driver/makeWebDriverChrome'
import { makeGameAnalits } from '../../analitcs/game/makeGameAnalits'

export const makeBotServerDouble = () =>
  new BotServerMetricsDouble(makeWebDriverChrome(), makeGameAnalits())
