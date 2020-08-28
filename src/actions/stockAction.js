import {
  RESET_STOCK_LOADING,
  CHECK_MARKET_STATUS,
  CHECK_MARKET_STATUS_ERROR,
  GET_STOCK_LIST,
  GET_EMPTY_STOCK_LIST,
  GET_STOCK_ERROR,
  GET_STOCK_GROUP,
  GET_STOCK_GROUP_ERROR,
  ADD_STOCK,
  EDIT_DAILY_RETURN,
  EDIT_OVERALL_RETURN,
  GET_SECTOR_ERROR,
  GET_SECTOR
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
    if (stocksResult.data !== null) {
      const sortedStocks = await sortStocks(stocksResult.data);
      dispatch({
        type: GET_STOCK_LIST,
        payload: sortedStocks
      });
    }
    else {
      dispatch({
        type: GET_EMPTY_STOCK_LIST,
        payload: []
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_STOCK_ERROR });
  }
}

export const getSectorInfo = (ticker) => async (dispatch) => {
  const config = { withCredentials: true };

  try {
    const response = await axios.get(`${SERVER_URL}/api/stock/sector/${ticker}`, config);

    dispatch({
      type: GET_SECTOR,
      payload: { ticker, sector: response.data }
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_SECTOR_ERROR });
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
    return 0;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export const editDailyReturn = (ticker, dailyReturn) => (dispatch) => {
  dispatch({
    type: EDIT_DAILY_RETURN,
    payload: { ticker, dailyReturn }
  });
}

export const editOverallReturn = (ticker, overallReturn) => (dispatch) => {
  dispatch({
    type: EDIT_OVERALL_RETURN,
    payload: { ticker, overallReturn }
  });
}

export const getStocksByTickerGroup = (portfolioId, ticker) => async (dispatch) => {
  const config = { withCredentials: true };
  try {
    const tickerGroupResult = await axios.get(`${SERVER_URL}/api/portfolio/${portfolioId}/${ticker}`, config);

    dispatch({
      type: GET_STOCK_GROUP,
      payload: tickerGroupResult.data
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_STOCK_GROUP_ERROR });
  }
}

export const resetStockLoading = () => (dispatch) => {
  dispatch({ type: RESET_STOCK_LOADING });
}