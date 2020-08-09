import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Navbar from './components/navbar/Navbar';
import MainTheme from './components/maintheme/MainTheme';
import MainPage from './components/mainpage/MainPage';
import './app.css';

export default function App() {
  return (
    <Provider store={store} >
      <Router>
        <Navbar />
        <Switch>
          <MainTheme>
            <Route path="/main" component={MainPage} exact={true} />
          </MainTheme>
        </Switch>
      </Router>
    </Provider>
  );
}