import { WebDriverBroswer } from '@data/protocols/web/driver'
import { ExecuteLogin } from '@domain/useCases/login/execute'
import { DecodeBearerToken } from '@domain/useCases/security/token/decode'
import { By, Key } from 'selenium-webdriver'

export class Login implements ExecuteLogin {
  constructor(
    private readonly webDriverBroswer: WebDriverBroswer,
    private readonly decodeBearerToken: DecodeBearerToken
  ) {}

  public async onLogin(props: ExecuteLogin.Props): ExecuteLogin.ReturnType {
    const { username, password } = props
    try {
      const urlLogin = 'https://blaze.com/pt/?modal=auth&tab=login'
      const driver = await this.webDriverBroswer.onCreateDriver()

      await driver.get(urlLogin)

      await driver
        .findElement(By.xpath(`//input[@name='username']`))
        .sendKeys(username)
      await driver
        .findElement(By.xpath(`//input[@name='password']`))
        .sendKeys(password + Key.ENTER)

      return Promise.resolve({
        accessToken: '',
        expirationTime: ''
      })
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    } finally {
      await this.webDriverBroswer.onDestroyDriver()
    }
  }
}
