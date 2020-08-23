import {
  GET_CASH,
  GET_CASH_ERROR,
  ADD_CASH,
  ADD_CASH_ERROR
} from '../actions/actionTypes';

const initialState = {
  totalCash: 0
}

export default function cashReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CASH:
      return {
        ...state,
        totalCash: payload
      }
    case ADD_CASH:
    case ADD_CASH_ERROR:
    case GET_CASH_ERROR:
    default:
      return state;
  }
}