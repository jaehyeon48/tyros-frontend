import {
  CHECK_MARKET_STATUS,
  GET_STOCK_LIST,
  GET_STOCK_ERROR,
  ADD_STOCK,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  stockList: [],
  isMarketOpen: null
};

export default function stockReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHECK_MARKET_STATUS:
      return {
        ...state,
        isMarketOpen: payload
      }
    case GET_STOCK_LIST:
      return {
        ...state,
        stockList: payload
      }
    case GET_STOCK_ERROR:
      return {
        ...state,
        stockList: []
      };
    case LOGOUT:
      return {
        stockList: [],
        isMarketOpen: null
      }
    case ADD_STOCK:
    default:
      return state;
  }
}