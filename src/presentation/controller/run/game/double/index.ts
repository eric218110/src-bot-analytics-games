import { Controller } from '@domain/http/controller'
import { HttpRequest } from '@domain/http/request'
import { RunGameDoubleModel } from '@domain/model/run/game/double'
import { RunGameDouble } from '@domain/useCases/bot/run/game/double'

export class RunGameDoubleController implements Controller {
  constructor(private readonly runGameDouble: RunGameDouble) {}

  public async handler({
    body
  }: HttpRequest<RunGameDoubleModel>): Promise<any> {
    this.runGameDouble.run(body)

    return {
      status: 'start'
    }
  }
}
