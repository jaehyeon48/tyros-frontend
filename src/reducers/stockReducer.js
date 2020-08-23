import {
  CHECK_MARKET_STATUS,
  CHECK_MARKET_STATUS_ERROR,
  GET_STOCK_LIST,
  GET_STOCK_ERROR,
  ADD_STOCK,
  ADD_TOTAL_COST,
  LOGOUT,
} from '../actions/actionTypes';

const initialState = {
  stockList: [],
  isMarketOpen: null,
  totalCost: 0.0
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
    case ADD_TOTAL_COST:
      return {
        ...state,
        totalCost: Number((state.totalCost + payload).toFixed(2))
      }
    case LOGOUT:
      return {
        stockList: [],
        isMarketOpen: null
      }
    case ADD_STOCK:
    case CHECK_MARKET_STATUS_ERROR:
    default:
      return state;
  }
}