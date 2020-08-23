import {
  GET_CASH,
  GET_CASH_ERROR
} from './actionTypes';

import axios from 'axios';
import SERVER_URL from './serverURL';

import { calculateTotalCashAmount } from '../utils/calculateTotalCash';


export const getCash = (portfolioId) => async (dispatch) => {
  const config = { withCredentials: true };

  try {
    const cashResponse = await axios.get(`${SERVER_URL}/api/portfolio/${portfolioId}/cash`, config);
    const totalCash = calculateTotalCashAmount(cashResponse.data);
    dispatch({
      type: GET_CASH,
      payload: totalCash
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_CASH_ERROR });
  }
}

export const addCash = (portfolioId, formData) => async (dispatch) => {

}