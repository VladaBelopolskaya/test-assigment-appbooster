export const getPartsOfConverterValue = (value: string) => {
  const match = value.match(/(\d+)\s(\w{3})\sin\s(\w{3})$/);
  return match
    ? { amount: match[1], fromCurrency: match[2], toCurrency: match[3] }
    : undefined;
};

export const getConverterValueError = (
  value: string,
  currencyKeys: string[]
) => {
  const partsOfValue = getPartsOfConverterValue(value);
  if (!partsOfValue) {
    return "Please write valid input";
  }

  if (!currencyKeys.includes(partsOfValue.fromCurrency.toUpperCase())) {
    return `Abbreviation ${partsOfValue.fromCurrency} is not valid`;
  }

  if (!currencyKeys.includes(partsOfValue.toCurrency.toUpperCase())) {
    return `Abbreviation ${partsOfValue.toCurrency} is not valid`;
  }

  return null;
};
