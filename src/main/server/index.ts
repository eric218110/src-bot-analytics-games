import { makeLogin } from '@main/factories/data/makeLogin'
import { config } from 'dotenv'

async function main() {
  config()
  const username = 'blazeappbottest1995@gmail.com'
  const password = 'Wghd$85a'

  await makeLogin().onLogin({
    username,
    password
  })
}

main()
