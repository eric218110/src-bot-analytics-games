import { Controller } from '@domain/http/controller'
import { Request, Response } from 'express'

export const adapterRouter = (controller: Controller) => {
  const result = async (request: Request, response: Response) => {
    const httpRequest = {
      body: request.body
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
  return result
}
