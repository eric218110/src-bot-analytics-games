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
  private amountLose = 0
  private amountWinner = 0
  private efectiveBet = 0
  private valueWithGale = 0
  private betInColorOnGale = ''

  constructor(private readonly webDriverBroswer: WebDriverBroswer) {
    const { METRICS_PAGE_DOUBLE: double = '' } = process.env
    this.doubleUrl = double
    this.webDriverBroswer.onCreateDriver().then((driver) => {
      this.driver = driver
      driver.manage().window().maximize()
    })
  }

  public async destroy(): Promise<object> {
    this.betIsRunning = false
    this.betLastColor = ''
    this.lastResult = []
    this.amountLose = 0
    this.amountWinner = 0
    this.efectiveBet = 0
    this.betInColorOnGale = ''
    this.valueWithGale = 0

    await this.setTokenInStorage('EMPTY')

    await this.webDriverBroswer.onDestroyDriver()
    this.driver = undefined as any
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
      if (this.amountWinner !== 0 || this.amountLose !== 0) {
        console.log(
          `Apostas realizadas: ${this.efectiveBet} | Venceu: ${this.amountWinner} | Perdeu: ${this.amountLose}`
        )
      }
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

    const interval = setInterval(async () => {
      if (Number(props.gale.max) < this.amountLose) {
        console.log('Top lose atingido, finalizando bot')
        this.destroy()
        clearInterval(interval)
      } else {
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

            if (Number(props.gale.max) >= this.amountLose) {
              this.lastResult.push(color)
              this.avaliableWinOrLose(color, props.amount)
              this.avaliateGamePossible(props)
            }
          }
        }
      }
    }, 5000)
  }

  private avaliateGamePossible(props: RunGameDouble.Props) {
    const lastResultString = this.lastResult.reduce((previous, current) => {
      return `${previous}, ${current}`.replace('n, ', '').replace(' ', '')
    }, 'n')

    if (this.valueWithGale !== 0) {
      this.betIn(this.betInColorOnGale, props)
      console.log('Color: ', this.betInColorOnGale)
      return
    }

    props.strategy.forEach((strategy) => {
      const [colorsStrategy, betIn] = strategy.split(':')

      if (lastResultString.includes(colorsStrategy)) {
        this.betIn(betIn, props)
        if (this.betInColorOnGale === '') {
          this.betInColorOnGale = betIn
        }
      }
    })
  }

  private calculateValueBet(amount: string, gale: string) {
    if (this.valueWithGale === 0) {
      return amount
    }
    if (this.valueWithGale > 0) {
      const mulGale = this.valueWithGale * Number(gale.replace(',', '.'))
      console.log(
        `Aplicando novamente gale de ${gale} no valor de ${this.valueWithGale} | Novo valor de aposta: ${mulGale}`
      )
      this.valueWithGale = mulGale
      return mulGale
    }
    if (this.amountLose >= 1) {
      const mulGale =
        Number(amount.replace(',', '.')) * Number(gale.replace(',', '.'))
      console.log(
        `Aplicando gale de ${gale} no valor de ${amount} | Novo valor de aposta: ${mulGale}`
      )
      this.valueWithGale = mulGale
      return mulGale
    }
    return amount
  }

  private async betIn(betIn: string, props: RunGameDouble.Props) {
    this.lastResult = []

    console.log(`\nRealizando aposta em: ${betIn}`)

    await this.driver.findElement(By.xpath(elements.inputValue)).clear()

    const valueMoneyBet = this.calculateValueBet(props.amount, props.gale.value)

    await this.driver
      .findElement(By.xpath(elements.inputValue))
      .sendKeys(valueMoneyBet)

    console.log('Valor da aposta', valueMoneyBet)

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
    }, 7000)
    this.betLastColor = betIn
    this.betIsRunning = true
  }

  private async avaliableWinOrLose(color: string, amount: string) {
    if (this.betIsRunning) {
      this.betIsRunning = false
      this.efectiveBet = this.efectiveBet + 1

      if (color === this.betLastColor) {
        console.log('Voce venceu')
        this.setValueMoney()
        this.valueWithGale = 0
        this.amountWinner = this.amountWinner + 1
        await this.driver.findElement(By.xpath(elements.inputValue)).clear()
        this.betInColorOnGale = ''
      } else {
        console.log('Voce perdeu')
        this.setValueMoney()
        this.amountLose = this.amountLose + 1
        if (this.valueWithGale === 0) {
          this.valueWithGale = Number(amount.replace(',', '.'))
        }
        await this.driver.findElement(By.xpath(elements.inputValue)).clear()
      }

      await this.driver.findElement(By.xpath(elements.inputValue)).clear()
    }
  }
}
