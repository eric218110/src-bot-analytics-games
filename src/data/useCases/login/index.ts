import { WebDriverBroswer } from '@data/protocols/web/driver'
import { ExecuteLogin } from '@domain/useCases/execute/login'
import { By, Key } from 'selenium-webdriver'

export class Login implements ExecuteLogin {
  constructor(private readonly webDriverBroswer: WebDriverBroswer) {}

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
      console.log('Login success')
    } catch (error) {
      console.error(error)
      await this.webDriverBroswer.onDestroyDriver()
      throw new Error(error)
    } finally {
      await this.webDriverBroswer.onDestroyDriver()
    }
  }
}
