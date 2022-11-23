const input = document.querySelector<HTMLInputElement>('#bid__cost')

let price: Promise<number>
//=>> getting the price
const priceGetter = async (): Promise<number> => {
  return await getCurrency(['TRY'])
}

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
  price = priceGetter()
  costValue.innerHTML = `<h4 style="display: grid; place-items: center;margin: 1.7em 0">
   Add price to view in html
   </h4>`
  oldCostValue?.append(costValue)
})

input?.addEventListener('input', async () => {
  await convert(costValue)
})

const convert = async (displayText: HTMLElement) => {
  const numToTL = Math.round(Number(input?.value) * (await price) * 0.8)
  displayText.style.direction = `ltr`
  displayText.innerHTML = `<h4 style="display: grid; place-items: center;margin: 1.7em 0">${numToTL} - 70 = ${
    numToTL - 70
  }TL</h4>`
}

const getCurrency = async (currencies: string[]): Promise<number> => {
  return await fetch(
    `https://api.freecurrencyapi.com/v1/latest?apikey=sSLJqP6lGUy4wgKna5CEVjSgcThLX1ml0eY9ZN8G&currencies=${
      currencies.join('%2C') || 'EUR%2CUSD%2CCAD%2CTRY'
    }`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.data.TRY
    })
}
