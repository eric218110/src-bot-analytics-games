import { Controller } from '@domain/http/controller'
import { ServerMetrics } from '@domain/useCases/bot/server/metrics'

export class BotController implements Controller {
  constructor(private readonly serverMetrics: ServerMetrics) {}

  public async handler(): Promise<any> {
    this.serverMetrics.onStartServerMetrics()
    return {
      server: 'start'
    }
  }
}
