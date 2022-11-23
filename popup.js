const result = document.getElementById('result')

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
          const mostaqlFee = paymentInfo.originalPrice * 0.8
          const paypalFee = mostaqlFee * 0.96
          const finalPrice = paypalFee * paymentInfo.try - 70
          result.innerText = !paymentInfo.originalPrice
            ? 'N/A'
            : `${Math.floor(finalPrice)}₺`
        }
      )
    }
  )
})
