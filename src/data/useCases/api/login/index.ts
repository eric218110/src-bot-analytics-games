import { HttpClient } from '@data/protocols/http/client'
import { ApiLoginProvider } from '@domain/useCases/api/login/provider'
import { DecodeBearerToken } from '@domain/useCases/api/security/token/decode'

export class LoginWithApiMethod implements ApiLoginProvider {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly decodeBearerToken: DecodeBearerToken
  ) {}

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
      const { accessToken = '' } = data

      const { exp, iat } = this.decodeBearerToken.onDecodeBearerToken<{
        iat: number
        exp: number
      }>(accessToken)

      return {
        accessToken,
        expirationTime: { exp, iat }
      }
    }
    return {
      error
    }
  }
}
