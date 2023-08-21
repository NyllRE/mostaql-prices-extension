interface ConvertOptions {
	displayText: HTMLInputElement;
	taxedPrice: number;
	originalPrice: number;
	currencies: string[];
}

export const convert = async ({
	displayText,
	taxedPrice,
	originalPrice, //=> in USD
	currencies,
}: ConvertOptions) => {
	displayText.style.direction = `ltr`;
	if (originalPrice < 25) {
		displayText.value = `Price should be 25$ or more.`;
		return;
	}
	const price = await getCurrency([...currencies]);
	const numToTL = Math.round(taxedPrice * price * 0.8 * 0.96);
	displayText.value = `${numToTL} - 70 = ${numToTL - 70}₺`;
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
