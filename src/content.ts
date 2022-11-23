import { convert, getCurrency } from './api'

const input = document.querySelector<HTMLInputElement>('#bid__cost')

//=>> share data to popup
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === 'popup' && msg.subject === 'paymentInfo') {
    getCurrency(['TRY']).then((data) => {
      response({
        originalPrice: Number(input!.value),
        try: data,
      })
    })
  }
  return true
})

//=>> removing the old text displayer
document
  .querySelector(
    '#bid-form_container > div:nth-child(1) > div.form-group.col-md-4.col-sm-4.hidden-xs'
  )
  ?.remove()

//=>> adding a new selector
const oldCostValue = document.querySelector(
  '#bid-form_container > div:nth-child(1)'
)
const costValue = document.createElement('div')

window.addEventListener('load', async () => {
  costValue.innerHTML = `<h4 style="display: grid; place-items: center;margin: 1.7em 0">
   Add price to view in html
   </h4>`
  oldCostValue?.append(costValue)
})

input?.addEventListener('input', async () => {
  await convert({
    displayText: costValue,
    originalPrice: Number(input.value),
    currencies: ['TRY'],
  })
})
