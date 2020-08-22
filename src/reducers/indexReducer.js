import { combineReducers } from 'redux';

import auth from './authReducer';
import portfolio from './portfolioReducer';
import alert from './alertReducer';
import stock from './stockReducer';

export default combineReducers({
  auth,
  portfolio,
  alert,
  stock
});