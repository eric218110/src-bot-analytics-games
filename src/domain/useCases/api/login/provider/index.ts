import { ExceptionHandler } from '@domain/exception/handler'

export type ApiLoginProvider = {
  onFetchLoginApi: (
    props: ApiLoginProvider.Props
  ) => Promise<ApiLoginProvider.ReturnType>
}

export namespace ApiLoginProvider {
  export type Props = {
    username: string
    password: string
  }

  export type ReturnType = {
    accessToken?: string
    expirationTime?: {
      iat: number
      exp: number
    }
    error?: ExceptionHandler
  }
}
