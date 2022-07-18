import { BotServerMetrics } from '@data/useCases/bot/server/metrics'
import { makeWebDriverChrome } from '@main/factories/web/driver/makeWebDriverChrome'

export const makeBotServer = () => new BotServerMetrics(makeWebDriverChrome())
