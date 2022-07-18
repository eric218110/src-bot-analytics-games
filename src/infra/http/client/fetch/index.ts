import { HttpClient } from '@data/protocols/http/client'
import axios from 'axios'

export class FetchHttpClient implements HttpClient {
  public async postMethod<B = object, R = object>(
    props: HttpClient.Props<B>
  ): Promise<HttpClient.ReturnType<R>> {
    const { body, url } = props

    try {
      const { data } = await axios.put(url, body)
      if (data.access_token) {
        return {
          data: {
            accessToken: data.access_token
          } as any
        }
      }
      return {
        data
      }
    } catch (error) {
      console.log(error)
      return {
        error: {
          message: 'Not possible execute method put',
          status: 500
        }
      }
    }
  }
}
