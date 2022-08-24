import { Options } from 'selenium-webdriver/chrome'

export const makeOptionsBroswerChorome = () => {
  const { HEADLESS_BROSWER = 'false' } = process.env

  const options = new Options()

  options.excludeSwitches(['enable-logging'] as any)
  options.addArguments(['--no-sandbox'] as any)
  options.addArguments(['start-maximized'] as any)
  options.addArguments(['--disable-infobars'] as any)
  options.addArguments(['--disable-extensions'] as any)
  options.addArguments(['chrome.switches', '--disable-extensions'] as any)
  options.addArguments(['--disable-gpu'] as any)
  options.addArguments(['--disable-dev-shm-usage'] as any)
  options.addArguments(['--no-sandbox'] as any)
  options.addArguments(['--disable-notifications'] as any)
  options.addArguments(['--disable-popup-blocking'] as any)
  options.addArguments(['enable-automation'] as any)
  options.addArguments(['--disable-dev-shm-usage'] as any)
  options.addArguments(['--disable-browser-side-navigation'] as any)
  options.addArguments(['--dns-prefetch-disable'] as any)
  options.addArguments(['--start-maximized'] as any)
  options.addArguments(['--window-size=1325x744'] as any)

  if (HEADLESS_BROSWER === 'true') {
    options.headless()
  }

  return options
}
