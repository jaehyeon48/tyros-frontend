import {
  GET_STOCK_LIST,
  GET_STOCK_ERROR,
  ADD_STOCK,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  stockList: []
};

export default function stockReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
        stockList: []
      }
    case ADD_STOCK:
    default:
      return state;
  }
}