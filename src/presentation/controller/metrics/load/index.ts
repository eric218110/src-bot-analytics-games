import { Controller } from '@domain/http/controller'

export class MetricsLoadController implements Controller {
  public handler(): Promise<any> {
    return Promise.resolve({})
  }
}
