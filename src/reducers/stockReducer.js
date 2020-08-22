import {
  GET_STOCK_LIST,
  SORT_STOCK,
  GET_STOCK_ERROR
} from '../actions/actionTypes';

const initialState = {
  stockList: {}
};

export default function stockReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SORT_STOCK:
      return {
        ...state,
        stockList: payload
      };
    case GET_STOCK_ERROR:
      return {
        ...state,
        stockList: {}
      };
    case GET_STOCK_LIST:
    default:
      return state;
  }
}