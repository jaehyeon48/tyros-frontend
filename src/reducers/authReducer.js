import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  loading: true,
  isAuthenticated: false,
  theme: 'dark',
  user: null
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    case USER_LOADED:
      const { userId, firstName, lastName, theme } = payload;
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: {
          userId,
          firstName,
          lastName
        },
        theme: theme
      };
    default:
      return state;
  }
}