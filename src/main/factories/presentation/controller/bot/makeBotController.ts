import { BotController } from '@presentantion/controller/metrics/bot'
import { makeBotServer } from '@main/factories/data/bot/server/makeBotServer'

export const makeBotController = () => {
  return new BotController(makeBotServer())
}
