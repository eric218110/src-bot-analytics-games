import { WebDriver } from '@domain/adapter/web/driver'

export type WebDriverBroswer = {
  onCreateDriver: () => WebDriverBroswer.ReturnType
  onDestroyDriver: () => Promise<void>
}

export namespace WebDriverBroswer {
  export type ReturnType = Promise<WebDriver>
}
