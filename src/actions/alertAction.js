import {
  SHOW_ALERT,
  HIDE_ALERT
} from './actionTypes';

export const showAlert = (alertMessage, alertType) => async (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: { alertMessage, alertType }
  });
}

export const hideAlert = () => async (dispatch) => {
  dispatch({ type: HIDE_ALERT });
}