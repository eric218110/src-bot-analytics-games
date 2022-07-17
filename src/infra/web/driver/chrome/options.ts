import { Options } from 'selenium-webdriver/chrome'

export const makeOptionsBroswerChorome = () => {
  const { HEADLESS_BROSWER = 'false' } = process.env

  const options = new Options()
  options.excludeSwitches(['enable-logging'] as any)
  options.addArguments(['--no-sandbox'] as any)

  if (HEADLESS_BROSWER === 'true') {
    options.headless()
  }

  return options
}
