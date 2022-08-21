export type RunGameCrashModel = {
  amount: string
  autoWithdraw: string
  login: {
    email: string
    password: string
  }
  maxLose: number
  maxWin: number
  activeBet: boolean
}
