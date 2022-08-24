import { WebDriverBroswer } from '@data/protocols/web/driver'
import { WebDriver } from '@domain/adapter/web/driver'
import { RunGameDouble } from '@domain/useCases/bot/run/game/double'
import { By } from 'selenium-webdriver'

export class GamerRunnerDouble implements RunGameDouble {
  private lastResult: Array<string> = []
  private driver: WebDriver
  private doubleUrl: string
  private inputBet =
    '//*[@id="roulette-controller"]/div[1]/div[2]/div[1]/div/div[1]/input'
  private betIsRunning = false
  private betLastColor = ''
  private valueMoney: string
  private winOrLose: 'win' | 'lose' | undefined = undefined

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
    const valueMoney = this.driver
      .findElement(
        By.xpath(
          '//*[@id="header"]/div[2]/div/div[2]/div/div[3]/div/a/div/div/div[1]'
        )
      )
      .getText()

    this.valueMoney = await valueMoney
    console.log(`Saldo atual: ${this.valueMoney}`)
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

    console.log(lastResultString)

    props.strategy.forEach((strategy) => {
      const [colorsStrategy, betIn] = strategy.split(':')

      if (lastResultString.includes(colorsStrategy)) {
        this.betIn(betIn, props)
      }
    })
  }

  private async betIn(betIn: string, props: RunGameDouble.Props) {
    this.lastResult = []

    console.log(`Realizando aposta em: ${betIn}`)

    await this.driver.findElement(By.xpath(this.inputBet)).clear()

    await this.driver
      .findElement(By.xpath(this.inputBet))
      .sendKeys(props.amount)

    console.log('Valor da aposta', props.amount)

    if (betIn === 'black') {
      await this.driver.executeScript(
        'document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.red").classList.remove("selected");\
        document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.white").classList.remove("selected");\
        document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.black").classList.add("selected")'
      )
    }
    if (betIn === 'red') {
      await this.driver.executeScript(
        'document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.red").classList.add("selected");\
        document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.white").classList.remove("selected");\
        document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.black").classList.remove("selected")'
      )
    }
    if (betIn === 'white') {
      await this.driver.executeScript(
        'document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.red").classList.remove("selected");\
        document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.white").classList.add("selected");\
        document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.black").classList.remove("selected")'
      )
    }

    setTimeout(async () => {
      if (props.activeBet === 'true') {
        const element = await this.driver.findElement(
          By.xpath('//*[@id="roulette-controller"]/div[1]/div[3]/button')
        )

        await element.click()
      }

      this.betLastColor = betIn
      this.betIsRunning = true
    }, 6000)
  }

  private async avaliableWinOrLose(color: string) {
    if (this.betIsRunning) {
      this.betIsRunning = false

      if (color === this.betLastColor) {
        console.log('Voce ganhou')
        this.setValueMoney()
        this.winOrLose = 'win'
      } else {
        console.log('Voce perdeu')
        this.setValueMoney()
        this.winOrLose = 'lose'
      }

      await this.driver.findElement(By.xpath(this.inputBet)).clear()
    }
  }
}
