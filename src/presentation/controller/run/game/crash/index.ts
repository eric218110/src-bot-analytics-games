import { Controller } from '@domain/http/controller'
import { HttpRequest } from '@domain/http/request'
import { RunGameCrashModel } from '@domain/model/run/game/crash'
import { RunGameCrash } from '@domain/useCases/bot/run/game/crash'

export class RunGameCrashController implements Controller {
  constructor(private readonly runGameDouble: RunGameCrash) {}

  public async handler({ body }: HttpRequest<RunGameCrashModel>): Promise<any> {
    this.runGameDouble.run(body)

    return {
      status: 'start'
    }
  }
}
