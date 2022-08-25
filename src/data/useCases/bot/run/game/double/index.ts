import { WebDriverBroswer } from '@data/protocols/web/driver'
import { WebDriver } from '@domain/adapter/web/driver'
import { RunGameDouble } from '@domain/useCases/bot/run/game/double'
import { By } from 'selenium-webdriver'
import { buttonInBetColors, elements } from './contants'

export class GamerRunnerDouble implements RunGameDouble {
  private lastResult: Array<string> = []
  private driver: WebDriver
  private doubleUrl: string
  private betIsRunning = false
  private betLastColor = ''
  private valueMoney: string
  private winOrLose: 'win' | 'lose' | undefined = undefined
  private amountLose = 0

  constructor(private readonly webDriverBroswer: WebDriverBroswer) {
    const { METRICS_PAGE_DOUBLE: double = '' } = process.env
    this.doubleUrl = double
    this.webDriverBroswer.onCreateDriver().then((driver) => {
      this.driver = driver
      driver.manage().window().maximize()
    })
  }

  public async destroy(): Promise<object> {
    await this.webDriverBroswer.onDestroyDriver()
    this.driver = undefined as any
    this.betIsRunning = false
    this.betLastColor = ''
    this.lastResult = []
    this.winOrLose = undefined

    console.log('\nSessão finalizada com sucesso\n')

    return {
      status: 'destroy'
    }
  }

  public async run(props: RunGameDouble.Props): Promise<void> {
    if (!this.driver) {
      this.driver = await this.webDriverBroswer.onCreateDriver()
    }

    this.showMessagesOnInitGame(props)
    await this.setTokenInStorage(props.login.accessToken)
    this.setValueMoney()
    await this.onAnalitcsGame(props)
  }

  private async setValueMoney() {
    setTimeout(async () => {
      const valueMoney = this.driver
        .findElement(By.xpath(elements.liMoney))
        .getText()

      this.valueMoney = await valueMoney
      console.log(`Saldo atual: ${this.valueMoney}`)
    }, 2000)
  }

  private showMessagesOnInitGame(props: RunGameDouble.Props) {
    console.log('Bot Double iniciado')
    console.log('Apostas cadastrada:')
    props.strategy.forEach((strategy) => {
      const [colors, betIn = ''] = strategy.split(':')
      console.log(`Caso ocorra: ${colors} -> aposta em ${betIn}`)
    })
  }

  private async setTokenInStorage(accessToken = ''): Promise<void> {
    this.driver.manage().window().maximize()
    await this.driver.get(this.doubleUrl)

    await this.driver.executeScript(
      'window.localStorage.setItem("ACCESS_TOKEN", arguments[0])',
      accessToken
    )

    await this.driver.get(this.doubleUrl)
  }

  private async onAnalitcsGame(props: RunGameDouble.Props): Promise<void> {
    const keyPageCompleted = 'page complete'

    setInterval(async () => {
      if (this.driver) {
        const pageState: any = (await this.driver.executeScript(() => {
          return document.querySelector('#roulette')?.classList.value ?? ''
        })) as Array<string>

        if (pageState === keyPageCompleted) {
          const lastItem = await this.driver.executeScript(() => {
            return document.querySelector(
              '#roulette-recent > div > div.entries.main > div:nth-child(1) > div > div'
            )?.classList
          })

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, color] = lastItem as any
          this.lastResult.push(color)
          this.avaliableWinOrLose(color)
          this.avaliateGamePossible(props)
        }
      }
    }, 5000)
  }

  private avaliateGamePossible(props: RunGameDouble.Props) {
    const lastResultString = this.lastResult.reduce((previous, current) => {
      return `${previous}, ${current}`.replace('n, ', '').replace(' ', '')
    }, 'n')

    props.strategy.forEach((strategy) => {
      const [colorsStrategy, betIn] = strategy.split(':')

      if (lastResultString.includes(colorsStrategy)) {
        this.betIn(betIn, props)
      }
    })
  }

  private async betIn(betIn: string, props: RunGameDouble.Props) {
    this.lastResult = []

    console.log(`\nRealizando aposta em: ${betIn}`)

    await this.driver.findElement(By.xpath(elements.inputValue)).clear()

    await this.driver
      .findElement(By.xpath(elements.inputValue))
      .sendKeys(props.amount)

    console.log('Valor da aposta', props.amount)

    if (betIn === 'black' || betIn === 'red' || betIn === 'white') {
      await this.driver.executeScript(buttonInBetColors[betIn])
    }

    const valueMoney = this.valueMoney

    setTimeout(async () => {
      console.log('Iniciando aposta')

      if (props.activeBet === 'true') {
        await this.driver.executeScript(
          'document.querySelector("#roulette-controller > div.body > div.place-bet > button").click()'
        )
      }

      if (valueMoney !== this.valueMoney) {
        console.log('Aposta efetivada com sucesso')
      }
    }, 6000)
    this.betLastColor = betIn
    this.betIsRunning = true
  }

  private async avaliableWinOrLose(color: string) {
    if (this.betIsRunning) {
      this.betIsRunning = false

      if (color === this.betLastColor) {
        console.log('Voce ganhou\n')
        this.setValueMoney()
        this.winOrLose = 'win'
      } else {
        console.log('Voce perdeu\n')
        this.setValueMoney()
        this.winOrLose = 'lose'
        this.amountLose = this.amountLose + 1
      }

      await this.driver.findElement(By.xpath(elements.inputValue)).clear()
    }
  }
}
