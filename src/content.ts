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

//=>> removing the old text displayer
document
	.querySelector(
		'#bid-form_container > div:nth-child(1) > div.form-group.col-md-4.col-sm-4.hidden-xs'
	)
	?.remove();

//=>> adding a new selector
const oldCostValue = document.querySelector(
	'#bid-form_container > div:nth-child(1)'
);
const costValue = document.createElement('div');

window.addEventListener('load', async () => {
	costValue.innerHTML = `<h4 style="display: grid; place-items: center;margin: 1.7em 0"; text-align: center>
   Add price to view in html
   </h4>`;
	oldCostValue?.append(costValue);
});

input?.addEventListener('input', async () => {
	await convert({
		displayText: costValue,
		originalPrice: Number(input.value),
		currencies: ['TRY'],
		leastAmount: Number(averagePrice),
	});
});
