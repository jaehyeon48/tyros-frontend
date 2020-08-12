import {
  SELECT_PORTFOLIO,
  LOAD_PORTFOLIO,
  CREATE_PORTFOLIO,
  EDIT_PORTFOLIO,
  DELETE_PORTFOLIO
} from '../actions/actionTypes'

const initialState = {
  portfolioList: [],
  currentPortfolio: null
};

export default function portfolioReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_PORTFOLIO:
      return {
        ...state,
        currentPortfolio: payload
      }
    case LOAD_PORTFOLIO:
      return {
        ...state,
        portfolioList: payload
      };
    case CREATE_PORTFOLIO:
    case EDIT_PORTFOLIO:
    case DELETE_PORTFOLIO:
    default:
      return state;
  };
}