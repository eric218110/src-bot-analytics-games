import { GameModel } from '@domain/adapter/database/prisma/model/game'
import { ExceptionHandler } from '@domain/exception/handler'

export type LoadMetricsRepository = {
  onLoadMetrics: (gameType: string) => Promise<LoadMetricsRepository.ReturnType>
}

export namespace LoadMetricsRepository {
  export type ReturnType = {
    data?: GameModel[]
    error?: ExceptionHandler
  }
}
