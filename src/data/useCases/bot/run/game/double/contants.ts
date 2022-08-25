export const buttonInBetColors = {
  black:
    'document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.red").classList.remove("selected");\
  document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.white").classList.remove("selected");\
  document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.black").classList.add("selected")',
  red: 'document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.red").classList.add("selected");\
  document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.white").classList.remove("selected");\
  document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.black").classList.remove("selected")',
  white:
    'document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.red").classList.remove("selected");\
  document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.white").classList.add("selected");\
  document.querySelector("#roulette-controller > div.body > div.inputs-wrapper > div.input.side > div > div.black").classList.remove("selected")'
}

export const elements = {
  inputValue:
    '//*[@id="roulette-controller"]/div[1]/div[2]/div[1]/div/div[1]/input',
  liMoney:
    '//*[@id="header"]/div[2]/div/div[2]/div/div[3]/div/a/div/div/div[1]',
  buttonRunBet: '//*[@id="roulette-controller"]/div[1]/div[3]/button'
}
