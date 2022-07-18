import { Controller } from '@domain/http/controller'
import { ApiLoginProvider } from '@domain/useCases/api/login/provider'

export class LoginApiController implements Controller {
  constructor(private readonly apiLoginProvider: ApiLoginProvider) {}

  public async handler({
    body
  }: {
    body: ApiLoginProvider.Props
  }): Promise<any> {
    return this.apiLoginProvider.onFetchLoginApi(body)
  }
}
