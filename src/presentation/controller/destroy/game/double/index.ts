import { Controller } from '@domain/http/controller'
import { RunGameDouble } from '@domain/useCases/bot/run/game/double'

export class DestroyGameDoubleController implements Controller {
  constructor(private readonly runGameDouble: RunGameDouble) {}

  public async handler(): Promise<any> {
    const response = await this.runGameDouble.destroy()

    return response
  }
}
