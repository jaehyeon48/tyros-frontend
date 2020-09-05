import {
  GET_TOTAL_CASH,
  GET_CASH_LIST,
  GET_CASH_ERROR,
  ADD_CASH,
  ADD_CASH_ERROR
} from './actionTypes';

import axios from 'axios';
import SERVER_URL from './serverURL';

import { calculateTotalCashAmount } from '../utils/calculateTotalCash';


export const getTotalCash = (portfolioId) => async (dispatch) => {
  const config = { withCredentials: true };

  try {
    const cashResponse = await axios.get(`${SERVER_URL}/api/portfolio/${portfolioId}/cash`, config);
    if (cashResponse.data.length > 0) {
      const totalCash = calculateTotalCashAmount(cashResponse.data);
      dispatch({
        type: GET_TOTAL_CASH,
        payload: totalCash
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_CASH_ERROR });
  }
}

export const addCash = (portfolioId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  try {
    const reqBody = JSON.stringify({ portfolioId, ...formData });
    await axios.post(`${SERVER_URL}/api/cash`, reqBody, config);
    dispatch({ type: ADD_CASH });
    dispatch(getTotalCash(portfolioId));
    return 0;
  } catch (error) {
    console.error(error);
    dispatch({ type: ADD_CASH_ERROR });
    return -1;
  }
}