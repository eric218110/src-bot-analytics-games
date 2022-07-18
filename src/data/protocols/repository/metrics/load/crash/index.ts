import { GameModel } from '@domain/adapter/database/prisma/model/game'
import { ExceptionHandler } from '@domain/exception/handler'

export type LoadMetricsGameCrashRepository = {
  onLoadMetricsCrash: () => Promise<LoadMetricsGameCrashRepository.ReturnType>
}

export namespace LoadMetricsGameCrashRepository {
  export type ReturnType = {
    data?: GameModel[]
    error?: ExceptionHandler
  }
}
