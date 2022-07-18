import { TokenProvider } from '@data/protocols/security/token/provider/decode'

export class SecurityTokenProvider implements TokenProvider {
  public decodeToken<T>(token: string): T {
    try {
      console.info(`Decoding token: ${token}`)
      const base64String = token.split('.')[1]
      const decodedValue = JSON.parse(
        Buffer.from(base64String, 'base64').toString('ascii')
      )
      console.info(`Token resut: ${JSON.stringify(decodedValue)}`)
      return decodedValue as T
    } catch (error) {
      console.error('Not possible decoder token')
      throw new Error(error)
    }
  }
}
