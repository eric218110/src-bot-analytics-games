import { WebDriver } from '@domain/adapter/web/driver'

export type AnalitcsGameCrashProvider = {
  onGameCrash: (driver: WebDriver) => Promise<void>
}
