import { HttpRequest } from '@domain/http/request'

export type Controller<T = object> = {
  handler: (params: HttpRequest<T>) => Promise<any>
}
