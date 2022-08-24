import { makeRunOrDestroyGameDouble } from '@main/factories/data/bot/game/runOrDestroy/double/game/makeRunGameDouble'
import { RunGameDoubleController } from '@presentantion/controller/run/game/double'

export const makeRunGameDoubleController = () => {
  return new RunGameDoubleController(makeRunOrDestroyGameDouble())
}
