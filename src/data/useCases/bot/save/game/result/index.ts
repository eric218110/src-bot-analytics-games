import { SaveMetricsGameDoubleRepository } from '@data/protocols/repository/metrics/save/double'
import { SaveMetricsGameCrashRepository } from '@data/protocols/repository/metrics/save/crash'
import { SaveGameResult } from '@domain/useCases/bot/save/game/result'
import { colors } from 'utils/colors'

export class ResultGameSaveInStorage implements SaveGameResult {
  constructor(
    private readonly saveMetricsGameDoubleRepository: SaveMetricsGameDoubleRepository,
    private readonly saveMetricsGameCrashRepository: SaveMetricsGameCrashRepository
  ) {}

  public async onSave(props: SaveGameResult.Props): Promise<void> {
    if (props.crash) {
      const { crashedIn: crash = '' } = props.crash
      if (crash !== '') {
        const crashedIn = crash.replace('X', '')
        const hex = Number(crashedIn) >= 2 ? colors.green : colors.black

        await this.saveMetricsGameCrashRepository.onSaveMetricsCrash({
          crashedIn,
          hex
        })
      }
    }

    if (props.double) {
      const { color = '' } = props.double
      if (color !== '') {
        if (color === 'black' || color === 'red' || color === 'white') {
          const hex = colors[color]
          const data = {
            color,
            hex
          }
          await this.saveMetricsGameDoubleRepository.onSaveMetricsDouble(data)
        }
      }
    }
  }
}
