const result = document.getElementById('result')
const warner = document.getElementById('warning')

window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'paymentInfo' },
        (paymentInfo) => {
          warner.innerText = ''
          if (paymentInfo.originalPrice < 25) {
            result.style.color = warner.style.color = "#df4578"
            warner.innerText = "Price should be higher than 25$"
          } else if (paymentInfo.originalPrice < paymentInfo.priceLimit) {
            warner.style.color = "#fa0"
            warner.innerText =
              `price is lower than the average ${paymentInfo.priceLimit}$`
          }
          console.log(paymentInfo.originalPrice, paymentInfo.priceLimit);
          const mostaqlFee = paymentInfo.originalPrice * 0.8
          const paypalFee = mostaqlFee * 0.96
          const finalPrice = paypalFee * paymentInfo.try - 70
          result.innerText = !paymentInfo.originalPrice
            ? 'N/A' : `${Math.floor(finalPrice)}₺`
        }
      )
    }
  )
})
