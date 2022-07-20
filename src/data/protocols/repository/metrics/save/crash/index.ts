import { ExceptionHandler } from '@domain/exception/handler'

export type SaveMetricsGameCrashRepository = {
  onSaveMetricsCrash: (
    props: SaveMetricsGameCrashRepository.Props
  ) => Promise<SaveMetricsGameCrashRepository.ReturnType>
}

export namespace SaveMetricsGameCrashRepository {
  export type ReturnType = {
    data?: boolean
    error?: ExceptionHandler
  }

  export type Props = {
    crashedIn: string
    hex: string
  }
}
