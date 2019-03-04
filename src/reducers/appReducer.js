import {
  GET_EXCHANGE_RATES_FAIL,
  GET_EXCHANGE_RATES_REQUEST,
  GET_EXCHANGE_RATES_SUCCESS,
} from "../actions/AppActions";

const initialState = {
  exchangeRates: {},
  errorMessage: "",
  isFetching: false,
};

export function appReducer(state = initialState, action) {
  switch(action.type) {
    case GET_EXCHANGE_RATES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_EXCHANGE_RATES_SUCCESS:
      return {
        exchangeRates: action.exchangeRates,
        isFetching: false,
      };
    case GET_EXCHANGE_RATES_FAIL:
      return {
        ...state,
        errorMessage: action.error,
      };
    default:
      return state;
  }
}