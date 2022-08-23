import { makeRunGameDouble } from '@main/factories/data/bot/game/run/double/game/makeRunGameDouble'
import { RunGameDoubleController } from '@presentantion/controller/run/game/double'

export const makeRunGameDoubleController = () => {
  return new RunGameDoubleController(makeRunGameDouble())
}
