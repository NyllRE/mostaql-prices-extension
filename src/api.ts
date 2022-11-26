interface ConvertOptions {
	displayText: HTMLElement;
	originalPrice: number;
	currencies: string[];
	leastAmount: Number;
}

export const convert = async ({
	displayText,
	originalPrice, //=> in USD
	currencies,
	leastAmount,
}: ConvertOptions) => {
	displayText.style.direction = `ltr`;
	if (originalPrice < 25 || originalPrice < leastAmount) {
		const shouldBe = leastAmount >= 25 ? leastAmount : 25;
		displayText.innerHTML = `<h4 style="display: grid; place-items: center;margin: 1.7em 0; text-align: center; color: #df4578">Price should be ${shouldBe}$ or more.</h4>`;
		return;
	}
	const price = await getCurrency([...currencies]);
	const numToTL = Math.round(originalPrice * price * 0.8 * 0.96);
	displayText.innerHTML = `<h4 style="display: grid; place-items: center;margin: 1.7em 0; text-align: center">${numToTL} - 70 = ${
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
