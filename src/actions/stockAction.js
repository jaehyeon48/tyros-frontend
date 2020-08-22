import {
  GET_STOCK_LIST,
  GET_STOCK_ERROR
} from './actionTypes';

import axios from 'axios';
import SERVER_URL from './serverURL';
import { sortStocks } from '../utils/sortStocks';

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