import { GameModel } from '@domain/adapter/database/prisma/model/game'
import { ExceptionHandler } from '@domain/exception/handler'

export type LoadMetricsGameDoubleRepository = {
  onLoadMetricsDouble: () => Promise<LoadMetricsGameDoubleRepository.ReturnType>
}

export namespace LoadMetricsGameDoubleRepository {
  export type ReturnType = {
    data?: GameModel[]
    error?: ExceptionHandler
  }
}
