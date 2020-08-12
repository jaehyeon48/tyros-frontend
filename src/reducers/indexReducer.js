import { combineReducers } from 'redux';

import auth from './authReducer';
import portfolio from './portfolioReducer';

export default combineReducers({
  auth,
  portfolio
});