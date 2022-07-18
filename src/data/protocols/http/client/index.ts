import { ExceptionHandler } from '@domain/exception/handler'

export type HttpClient = {
  postMethod: <B = object, R = object>(
    props: HttpClient.Props<B>
  ) => Promise<HttpClient.ReturnType<R>>
}

export namespace HttpClient {
  export type Props<B> = {
    url: string
    body: B
  }
  export type ReturnType<R> = {
    data?: R
    error?: ExceptionHandler
  }
}
