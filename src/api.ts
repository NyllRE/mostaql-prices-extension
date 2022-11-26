interface ConvertOptions {
	displayText: HTMLInputElement;
	originalPrice: number;
	currencies: string[];
}

export const convert = async ({
	displayText,
	originalPrice, //=> in USD
	currencies,
}: ConvertOptions) => {
	displayText.style.direction = `ltr`;
	if (originalPrice < 25) {
		displayText.value = `Price should be 25$ or more.`;
		return;
	}
	const price = await getCurrency([...currencies]);
	const numToTL = Math.round(originalPrice * price * 0.8 * 0.96 - 70);
	displayText.value = `${numToTL}`;
	console.log(displayText.value, numToTL);
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
