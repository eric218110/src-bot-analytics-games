export type MetricsLoad = {
  handlerMetrics: (props: MetricsLoad.Props) => Promise<void>
}

export namespace MetricsLoad {
  export type Props = {
    username: string
    password: string
  }
}
