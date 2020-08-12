import {
  SELECT_PORTFOLIO,
  LOAD_PORTFOLIO,
  CREATE_PORTFOLIO,
  EDIT_PORTFOLIO,
  DELETE_PORTFOLIO,
  PORTFOLIO_LOAD_ERROR,
  PORTFOLIO_EDIT_ERROR,
  PORTFOLIO_DELETE_ERROR
} from './actionTypes';
import SERVER_URL from './serverURL';

import axios from 'axios';

export const loadPortfolios = (userId) => async (dispatch) => {
  try {
    const portfolioResponse = await axios.get(`${SERVER_URL}/api/portfolio`, { withCredentials: true });

    dispatch({
      type: LOAD_PORTFOLIO,
      payload: portfolioResponse.data
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: PORTFOLIO_LOAD_ERROR });
  }
}

export const selectCurrentPortfolio = (selectedPortfolio) => (dispatch) => {
  dispatch({
    type: SELECT_PORTFOLIO,
    payload: selectedPortfolio
  });
}