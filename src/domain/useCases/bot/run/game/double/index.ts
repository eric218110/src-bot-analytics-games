import { RunGameDoubleModel } from '@domain/model/run/game/double'

export type RunGameDouble = {
  run: (props: RunGameDouble.Props) => Promise<void>
  destroy: () => Promise<object>
}

export namespace RunGameDouble {
  export type Props = RunGameDoubleModel
}
