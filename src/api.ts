interface ConvertOptions {
  displayText: HTMLElement
  originalPrice: number
  currencies: string[]
}

export const convert = async ({
	displayText,
	originalPrice, //=> in USD
	currencies,
}: ConvertOptions) => {
	if (originalPrice < 25) {
		displayText.innerHTML = `your fee should be 25$ or more`;
		return;
	}
	const price = await getCurrency([...currencies]);
	const numToTL = Math.round(originalPrice * price * 0.8 * 0.96);
	displayText.style.direction = `ltr`;
	displayText.innerHTML = `<h4 style="display: grid; place-items: center;margin: 1.7em 0">${numToTL} - 70 = ${
		numToTL - 70
	}₺</h4>`;
};

export const getCurrency = async (currencies: string[]): Promise<number> => {
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
