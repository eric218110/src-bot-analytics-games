import { HttpClient } from '@data/protocols/http/client'
import { ApiLoginProvider } from '@domain/useCases/api/login/provider'

export class LoginWithApiMethod implements ApiLoginProvider {
  constructor(private readonly httpClient: HttpClient) {}

  public async onFetchLoginApi(
    body: ApiLoginProvider.Props
  ): Promise<ApiLoginProvider.ReturnType> {
    const { URL_LOGIN_API: url = '' } = process.env

    const { data, error } = await this.httpClient.postMethod<
      ApiLoginProvider.Props,
      ApiLoginProvider.ReturnType
    >({
      url,
      body
    })

    if (data) {
      return data
    }
    return {
      error
    }
  }
}
