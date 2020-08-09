import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './app.css';

export default function App() {
  return (
    <Provider store={store} >
      <p>initial redux setup</p>
    </Provider>
  );
}