import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  LOGOUT,
  UPLOAD_AVATAR
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
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: {}
      }
    case USER_LOADED:
      const { userId, firstName, lastName, email, avatar, theme } = payload;
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: {
          userId,
          firstName,
          lastName,
          email,
          avatar
        },
        theme: theme
      };
    case UPLOAD_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload
        }
      }
    default:
      return state;
  }
}