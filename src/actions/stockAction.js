import {
  CHECK_MARKET_STATUS,
  CHECK_MARKET_STATUS_ERROR,
  GET_STOCK_LIST,
  GET_STOCK_ERROR,
  ADD_STOCK,
  EDIT_DAILY_PL,
  EDIT_OVERALL_PL
} from './actionTypes';

import axios from 'axios';
import SERVER_URL from './serverURL';
import { sortStocks } from '../utils/sortStocks';

export const checkMarketStatus = () => async (dispatch) => {
  const config = { withCredentials: true };
  try {
    const marketStatusResponse = await axios.get(`${SERVER_URL}/api/stock/marketStatus`, config);
    dispatch({
      type: CHECK_MARKET_STATUS,
      payload: marketStatusResponse.data
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: CHECK_MARKET_STATUS_ERROR });
  }
}

export const getStocks = (portfolioId) => async (dispatch) => {
  const config = { withCredentials: true };
  try {
    const stocksResult = await axios.get(`${SERVER_URL}/api/portfolio/${portfolioId}/stocks`, config);
    const sortedStocks = sortStocks(stocksResult.data);
    dispatch({
      type: GET_STOCK_LIST,
      payload: sortedStocks
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_STOCK_ERROR });
  }
}

export const addStock = (portfolioId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  try {
    const reqBody = JSON.stringify({ portfolioId, ...formData });

    await axios.post(`${SERVER_URL}/api/stock`, reqBody, config);
    dispatch({ type: ADD_STOCK });
    dispatch(getStocks(portfolioId));
    return 0;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export const editDailyPL = (ticker, dailyPL) => (dispatch) => {
  dispatch({
    type: EDIT_DAILY_PL,
    payload: { ticker, dailyPL }
  });
}

export const editOverallPL = (ticker, overallPL) => (dispatch) => {
  dispatch({
    type: EDIT_OVERALL_PL,
    payload: { ticker, overallPL }
  });
}