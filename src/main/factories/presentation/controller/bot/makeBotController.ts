import { BotController } from '@presentantion/controller/metrics/bot'
import { makeBotServerCrash } from '@main/factories/data/bot/server/crash/makeBotServerCrash'
import { makeBotServerDouble } from '@main/factories/data/bot/server/double/makeBotServerCrash'

export const makeBotController = () => {
  return new BotController(makeBotServerCrash(), makeBotServerDouble())
}
