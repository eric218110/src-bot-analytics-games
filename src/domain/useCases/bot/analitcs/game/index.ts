import { WebDriver } from '@domain/adapter/web/driver'
import { GameModelType } from '@domain/model/game'

export type GameAnalitcs = {
  onAnalitcsGameByType: (props: GameAnalitcs.Props) => Promise<void>
}

export namespace GameAnalitcs {
  export type Props = {
    gameType: GameModelType
    driver: WebDriver
  }
}
