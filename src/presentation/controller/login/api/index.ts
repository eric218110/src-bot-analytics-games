import { Controller } from '@domain/http/controller'
import { HttpRequest } from '@domain/http/request'
import { ApiLoginProvider } from '@domain/useCases/api/login/provider'

export class LoginApiController implements Controller {
  constructor(private readonly apiLoginProvider: ApiLoginProvider) {}

  public async handler({
    body
  }: HttpRequest<ApiLoginProvider.Props>): Promise<any> {
    return this.apiLoginProvider.onFetchLoginApi(body)
  }
}
