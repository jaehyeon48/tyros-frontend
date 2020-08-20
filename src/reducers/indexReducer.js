import { combineReducers } from 'redux';

import auth from './authReducer';
import portfolio from './portfolioReducer';
import alert from './alertReducer';

export default combineReducers({
  auth,
  portfolio,
  alert
});