import { RunGameDoubleModel } from '@domain/model/run/game/double'

export type RunGameDouble = {
  run: (props: RunGameDouble.Props) => Promise<void>
}

export namespace RunGameDouble {
  export type Props = RunGameDoubleModel
}
