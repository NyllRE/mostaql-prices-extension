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
          if (paymentInfo.originalPrice < paymentInfo.priceLimit) {
            result.style.color = warner.style.color = "#df4578"
            warner.innerText = `Price should be higher than ${paymentInfo.priceLimit}$`
          }
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
