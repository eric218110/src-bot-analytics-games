import { RunGameCrashModel } from '@domain/model/run/game/crash'
import { RunGameCrash } from '@domain/useCases/bot/run/game/crash'

export class GamerRunnerCrash implements RunGameCrash {
  public async run(props: RunGameCrashModel): Promise<void> {
    console.log(props)
    return Promise.resolve()
  }
}
