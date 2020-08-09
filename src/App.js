import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './app.css';

export default function App() {
  return (
    <Provider store={store} >
      <Router>
        <p>Router setup</p>
      </Router>
    </Provider>
  );
}