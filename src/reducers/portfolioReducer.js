import {
  SELECT_PORTFOLIO,
  LOAD_PORTFOLIO,
  CREATE_PORTFOLIO,
  EDIT_PORTFOLIO,
  DELETE_PORTFOLIO,
  PORTFOLIO_LOAD_ERROR,
  PORTFOLIO_EDIT_ERROR,
  PORTFOLIO_DELETE_ERROR
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
      };
    case LOAD_PORTFOLIO:
      return {
        ...state,
        portfolioList: payload
      };
    case PORTFOLIO_LOAD_ERROR:
      return {
        ...state,
        portfolioList: [],
        currentPortfolio: null
      };
    case PORTFOLIO_EDIT_ERROR:
    case PORTFOLIO_DELETE_ERROR:
    case CREATE_PORTFOLIO:
    case EDIT_PORTFOLIO:
    case DELETE_PORTFOLIO:
    default:
      return state;
  };
}