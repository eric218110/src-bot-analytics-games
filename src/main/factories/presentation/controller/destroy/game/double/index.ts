import { makeRunOrDestroyGameDouble } from '@main/factories/data/bot/game/runOrDestroy/double/game/makeRunGameDouble'
import { DestroyGameDoubleController } from '@presentantion/controller/destroy/game/double'

export const makeDestroyGameDoubleController = () => {
  return new DestroyGameDoubleController(makeRunOrDestroyGameDouble())
}
