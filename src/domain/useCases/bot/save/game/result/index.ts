import {
  GameModelCrash,
  GameModelDouble
} from '@domain/adapter/database/prisma/model/game'

export type SaveGameResult = {
  onSave: (props: SaveGameResult.Props) => Promise<void>
}

export namespace SaveGameResult {
  export type Props = {
    crash?: Partial<GameModelCrash>
    double?: Partial<GameModelDouble>
  }
}
