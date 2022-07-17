import { TokenProvider } from '@data/protocols/security/token/provider/decode'
import { DecodeBearerToken } from '@domain/useCases/security/token/decode'

export class DecoderToken implements DecodeBearerToken {
  constructor(private readonly tokenProvider: TokenProvider) {}

  public onDecodeBearerToken<T>(token: string): T {
    if (token !== '') {
      return this.tokenProvider.decodeToken(token)
    }
    throw new Error('Token is empty')
  }
}
