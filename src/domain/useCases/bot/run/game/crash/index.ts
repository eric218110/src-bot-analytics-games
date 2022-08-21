import { RunGameCrashModel } from '@domain/model/run/game/crash'

export type RunGameCrash = {
  run: (props: RunGameCrashModel) => Promise<void>
}

export namespace RunGameCrashModel {
  export type Props = RunGameCrashModel
}
