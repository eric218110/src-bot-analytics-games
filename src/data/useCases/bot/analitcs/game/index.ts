import { GameAnalitcs } from '@domain/useCases/bot/analitcs/game'
import { By } from 'selenium-webdriver'
import { SaveGameResult } from '@domain/useCases/bot/save/game/result'

export class AnalitcsGame implements GameAnalitcs {
  constructor(private readonly saveGameResult: SaveGameResult) {}

  public async onAnalitcsGameByType(props: GameAnalitcs.Props): Promise<void> {
    if (props.gameType === 'crash') {
      await this.onAnalitcsGameCrash(props.driver)
    }
    if (props.gameType === 'double') {
      await this.onAnalitcsGameDouble(props.driver)
    }
  }

  private async onAnalitcsGameCrash(driver: any) {
    let lastNumberItem = 0
    setInterval(async () => {
      const children = (await driver.executeScript(() => {
        return document
          .querySelector('.entries')
          ?.textContent?.split('X')
          .filter((x) => x !== '')
      })) as Array<string>
      if (children.length > lastNumberItem) {
        lastNumberItem = children.length
        const crashedIn: string = await driver
          .findElement(
            By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')
          )
          .getText()
        this.saveGameResult.onSave({ crash: { crashedIn } })
      }
    }, 1000)
  }

  private async onAnalitcsGameDouble(driver: any) {
    const keyPageCompleted = 'page complete'

    setInterval(async () => {
      const pageState: any = (await driver.executeScript(() => {
        return document.querySelector('#roulette')?.classList.value ?? ''
      })) as Array<string>

      if (pageState === keyPageCompleted) {
        const lastItem = await driver.executeScript(() => {
          return document.querySelector(
            '#roulette-recent > div > div.entries.main > div:nth-child(1) > div > div'
          )?.classList
        })

        const [_, color] = lastItem

        this.saveGameResult.onSave({ double: { color } })
      }
    }, 5000)
  }
}
