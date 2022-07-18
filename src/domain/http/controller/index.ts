import { HttpRequest } from '@domain/http/request'

export type Controller = {
  handler: (params: HttpRequest) => Promise<any>
}
