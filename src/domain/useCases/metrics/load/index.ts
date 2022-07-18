import { GameModel } from '@domain/adapter/database/prisma/model/game'
import { ExceptionHandler } from '@domain/exception/handler'

export type MetricsLoad = {
  handlerMetrics: (gameType: string) => Promise<MetricsLoad.ReturnType>
}

export namespace MetricsLoad {
  export type ReturnType = {
    data?: GameModel[]
    error?: ExceptionHandler
  }
}
