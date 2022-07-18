import { Controller } from '@domain/http/controller'
import { HttpRequest } from '@domain/http/request'
import { Request, Response } from 'express'

export const adapterRouter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params
    }

    const res = await controller.handler(httpRequest)

    if (res.error) {
      response.status(res.error.status).json({
        error: res.error.message,
        status: res.error.status
      })
    }

    response.json(res).status(200)
  }
}
