import {

} from '../actions/actionTypes';

const initialState = {
  totalCash: 0
}

export default function cashReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}