export function getDynamicsUri(id, startDate, endDate) {
  return `http://www.nbrb.by/API/ExRates/Rates/Dynamics/${id}?startDate=${startDate}&endDate=${endDate}`;
}

export function getCurrencyRateUri(id, date) {
  return `http://www.nbrb.by/API/ExRates/Rates/${id}?onDate=${date}`;
}
