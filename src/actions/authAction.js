import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  AUTH_FAIL
} from './actionTypes';
import SERVER_URL from './serverURL';
import axios from 'axios';

export const loadUser = () => async dispatch => {
  try {
    const loadResponse = await axios.get(`${SERVER_URL}/api/auth`, { withCredentials: true });

    const userPayloadData = {
      userId: loadResponse.data.user_id,
      firstName: loadResponse.data.first_name,
      lastName: loadResponse.data.last_name,
      theme: loadResponse.data.theme
    }
    dispatch({
      type: USER_LOADED,
      payload: userPayloadData
    })
  } catch (error) {
    dispatch({ type: AUTH_FAIL });
    console.error(error);
  }
}

export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  const reqBody = JSON.stringify(formData);

  try {
    await axios.post(`${SERVER_URL}/api/auth/login`, reqBody, config);

    dispatch({ type: LOGIN_SUCCESS });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    console.error(error.response.data);
  }
}

export const signUp = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  const reqBody = JSON.stringify(formData);

  try {
    await axios.post(`${SERVER_URL}/api/auth/signup`, reqBody, config);

    dispatch({ type: SIGNUP_SUCCESS });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL });
    console.error(error.response.data);
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${SERVER_URL}/api/auth/logout`, { withCredentials: true });
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error(error);
    dispatch({ type: AUTH_FAIL });
  }
}