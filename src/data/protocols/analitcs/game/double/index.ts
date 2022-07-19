import { WebDriver } from '@domain/adapter/web/driver'

export type AnalitcsGameDoubleProvider = {
  onGameDouble: (driver: WebDriver) => Promise<void>
}
