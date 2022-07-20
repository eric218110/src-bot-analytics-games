import { GameCrash, GameDouble } from '@prisma/client'

export type GameModel = GameCrash | GameDouble
export type GameModelCrash = GameCrash
export type GameModelDouble = GameDouble
