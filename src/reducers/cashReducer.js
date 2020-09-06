import {
  GET_TOTAL_CASH,
  GET_CASH_LIST,
  GET_CASH_ERROR,
  ADD_CASH,
  ADD_CASH_ERROR
} from '../actions/actionTypes';

const initialState = {
  cashList: [],
  totalCash: 0,
  cashLoading: true
}

export default function cashReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CASH_LIST:
      return {
        ...state,
        cashList: payload,
        cashLoading: false
      };
    case GET_TOTAL_CASH:
      return {
        ...state,
        totalCash: payload,
        cashLoading: false
      };
    case ADD_CASH:
    case ADD_CASH_ERROR:
    case GET_CASH_ERROR:
    default:
      return {
        ...state,
        cashLoading: false
      }
  }
}