import { ExceptionHandler } from '@domain/exception/handler'

export type SaveMetricsGameDoubleRepository = {
  onSaveMetricsDouble: (
    props: SaveMetricsGameDoubleRepository.Props
  ) => Promise<SaveMetricsGameDoubleRepository.ReturnType>
}

export namespace SaveMetricsGameDoubleRepository {
  export type ReturnType = {
    data?: boolean
    error?: ExceptionHandler
  }

  export type Props = {
    color: string
    hex: string
  }
}
