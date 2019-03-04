import { ID_ARRAY } from "./constants";
import { getCurrencyRateUri } from "./uriCreator";

export function convertToPresetFormat(_date) {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export function findDifference (a, b) {
  return (a - b) / b * 100;
}

export async function getCurrencyRateOnDate(date) {
  const ratesResponses = ID_ARRAY.map(
    async id => {
      const rate = await fetch(getCurrencyRateUri(id, date));
      return rate.json();
    }
  );
  const rates = await Promise.all(ratesResponses);
  let exchangeRates = {};
  rates.forEach(rate => {
    exchangeRates[rate.Cur_Abbreviation] = rate.Cur_OfficialRate / rate.Cur_Scale;
  });
  return exchangeRates;
}