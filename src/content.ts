import { convert, getCurrency } from './api'

/** the recieved input field */
const input = document.querySelector<HTMLInputElement>('#bid__cost');
// || document.querySelector<HTMLSpanElement>(
// 	'#bid5239326 > div > div.vertical-meta > div > div:nth-child(1) > div > span'
// );
console.log(input);

/** this is taken from the average price value to then be used to notify you earlier that you should put a higher price than that */
const leastPrice: Number = Number(
	document
		.querySelector<HTMLInputElement>(
			'#project-meta-panel > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > span'
		)!
		.innerText.split(' - ')[0]
		.slice(1)
);

//=>> this is bothering me, it shouldn't have an autocomplete lmao??
input?.setAttribute('autocomplete', 'off');

//=>> share data to popup
chrome.runtime.onMessage.addListener((msg, sender, response) => {
	if (msg.from === 'popup' && msg.subject === 'paymentInfo') {
		getCurrency(['TRY']).then((data) => {
			response({
				originalPrice: Number(input!.value),
				try: data,
				priceLimit: leastPrice,
			});
		});
	}
	return true;
});