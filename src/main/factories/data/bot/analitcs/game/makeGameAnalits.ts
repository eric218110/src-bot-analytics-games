import { AnalitcsGame } from '@data/useCases/bot/analitcs/game'
import { makeSaveResult } from '../../result/save/makeSaveResult'

export const makeGameAnalits = () => new AnalitcsGame(makeSaveResult())
