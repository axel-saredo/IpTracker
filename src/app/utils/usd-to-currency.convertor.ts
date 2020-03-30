export function getDollarPriceInCurrency(
  currency: string,
  rates: any,
  usdInEuros: number
) {
  const convertedCurrency = (rates.rates[currency] * usdInEuros).toFixed(2);

  return convertedCurrency;
}
