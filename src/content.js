const input = document.querySelector("#bid__cost")
const defaultCostVal = document.querySelector("#bid__realCost")
const costVal = document.querySelector("#bid-form_container > div:nth-child(1) > div.form-group.col-md-4.col-sm-4.hidden-xs > p")

// costVal.setAttribute("oninput", "convert()");

const convert = () => {
   costVal.innerHTML = Math.round(Number(input.value) * .80 * 18.6 - 70)
}
input.addEventListener("input", async () => {
   convert()
})


defaultCostVal.addEventListener("input", () => {
   console.log('e3')
})
defaultCostVal.innerHTML.addEventListener("change", () => {
   console.log('e3')
})

defaultCostVal.innerHTML.onChange = function () {
   alert('eeee3')
   console.log('eee3')
}
defaultCostVal.addEventListener("propertychange", () => {
   console.log('e3')
})


function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}