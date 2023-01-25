const result = document.getElementById('result')
const warner = document.getElementById('warning')

const onPaymentInfo = ({ originalPrice, priceLimit, TRY }) => {
  if (originalPrice) {
    warner.innerText = ''
    if (originalPrice < priceLimit) {
      result.style.color = warner.style.color = '#df4578'
      warner.innerText = `Price should be higher than ${priceLimit}$`
    }

    const mostaqlFee = originalPrice * 0.8
    const paypalFee = mostaqlFee * 0.96
    const finalPrice = paypalFee * TRY - 70

    result.innerText = `${Math.floor(finalPrice)}₺`
  } else {
    result.innerText = 'N/A'
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const queryInfo = {
    active: true,
    currentWindow: true,
  }

  chrome.tabs.query(queryInfo, (tabs) => {
    const tabId = tabs[0].id
    const messageInfo = { from: 'popup', subject: 'paymentInfo' }

    chrome.tabs.sendMessage(tabId, messageInfo, onPaymentInfo)
  })
})
