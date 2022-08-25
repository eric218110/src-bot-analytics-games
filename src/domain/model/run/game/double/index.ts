export type RunGameDoubleModel = {
  amount: string
  login: {
    accessToken: string
  }
  gale: {
    value: string
    max: string
  }
  strategy: Array<string>
  activeBet: string
}
