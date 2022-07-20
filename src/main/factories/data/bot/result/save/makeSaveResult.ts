import { ResultGameSaveInStorage } from '@data/useCases/bot/save/game/result'
import { makeSaveMetricsRepository } from '@main/factories/infra/database/repository/metrics/save/makeSaveMetricsRepository'

export const makeSaveResult = () => {
  return new ResultGameSaveInStorage(
    makeSaveMetricsRepository(),
    makeSaveMetricsRepository()
  )
}
