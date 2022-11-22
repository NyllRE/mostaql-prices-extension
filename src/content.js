const input = document.querySelector("#bid__cost")
const defaultCostVal = document.querySelector("#bid__realCost")


//=>> getting the price
const price = async () => {
   return await getCurrency(["TRY"])
}


//=>> removing the old text displayer
document.querySelector("#bid-form_container > div:nth-child(1) > div.form-group.col-md-4.col-sm-4.hidden-xs").remove()


//=>> adding a new selector
const oldCostValue = document
   .querySelector("#bid-form_container > div:nth-child(1)")
const costValue = document.createElement("div")
oldCostValue.append(costValue)


// defaultCostVal.addEventListener("load", async () => {
   
//    console.log(await loadHTML('components/placeholder.html'));
// })


input.addEventListener("input", async () => {
   costValue.innerHTML = await loadHTML("./components/placeholder.html")
   // await convert(costValue)
})

const convert = async (displayText) => {
   const Lira = await price()
   const numToTL = Math.round(Number(input.value) * Lira * .80)
   displayText.style.direction = `ltr`
   displayText.innerHTML =
      `<h4 style="display: grid; place-items: center;margin: 1.7em 0">${numToTL} - 70 = ${numToTL - 70}TL</h4>`
}

const getCurrency = async (currencies) => {

   return await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=sSLJqP6lGUy4wgKna5CEVjSgcThLX1ml0eY9ZN8G&currencies=${currencies.join("%2C") || 'EUR%2CUSD%2CCAD%2CTRY'}`)
      .then((response) => response.json())
      .then((data) => {
         return data.data.TRY
      });
}

const loadHTML = async (file) => {
   return await fetch(file)
      .then(response => response.text())
      .then(text => {
         console.log(text)
         return text
      });
}
