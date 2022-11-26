import { convert, getCurrency } from './api'

/** the recieved input field */
const input = document.querySelector<HTMLInputElement>('#bid__cost');

/** this is taken from the average price value to then be used to notify you earlier that you should put a higher price than that */
let averagePrice: Number | undefined = Number(
	document
		.querySelector(
			'#project-meta-panel > div:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2) > span'
		)
		?.innerHTML.slice(1)
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
				priceLimit: averagePrice,
			});
		});
	}
	return true;
});

//=>> displaying value in the other thingy
// const costValue = document.querySelector<HTMLInputElement>(
// 	'#bid-form_container > div:nth-child(1) > div.form-group.col-md-4.col-sm-4.hidden-xs'
// );


// input?.addEventListener('input', async () => {
// 	console.log('before');
// 	await setTimeout(async () => {
// 		await convert({
// 			displayText: costValue!,
// 			originalPrice: Number(input.value),
// 			currencies: ['TRY'],
// 		});
// 		console.log('in');
// 	}, 1000);
// 	console.log('after');
// });
