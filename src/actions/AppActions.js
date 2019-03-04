import { getCurrencyRateOnDate } from "../utils/helpers";

export const GET_EXCHANGE_RATES_REQUEST = 'GET_EXCHANGE_RATES_REQUEST';
export const GET_EXCHANGE_RATES_SUCCESS = 'GET_EXCHANGE_RATES_SUCCESS';
export const GET_EXCHANGE_RATES_FAIL = 'GET_EXCHANGE_RATES_FAIL';

export function getExchangeRates(date) {
  return dispatch => {
    dispatch({
      type: GET_EXCHANGE_RATES_REQUEST,
      date,
    });

    getCurrencyRateOnDate(date)
      .then(
        (exchangeRates) => {
          dispatch({
            type: GET_EXCHANGE_RATES_SUCCESS,
            exchangeRates,
          });
        }
      )
      .catch(error => {
        dispatch({
          type: GET_EXCHANGE_RATES_FAIL,
          error: 'Bad news with rates loading',
        });
    });

  };
}
