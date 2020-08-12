import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import LandingPage from './components/landingpage/LandingPage';
import Navbar from './components/navbar/Navbar';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import MainTheme from './components/maintheme/MainTheme';
import MainPage from './components/mainpage/MainPage';
import ManagePortfolio from './components/user/ManagePortfolio';
import './app.css';

import { loadUser } from './actions/authAction';

export default function App() {
  useEffect(() => { store.dispatch(loadUser()) }, []);

  return (
    <Provider store={store} >
      <Router>
        <Navbar />
        <Switch>
          <MainTheme>
            <Route path="/" component={LandingPage} exact={true} />
            <Route path="/signup" component={SignUp} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/main" component={MainPage} exact={true} />
            <Route path="/portfolio" component={ManagePortfolio} exact={true} />
          </MainTheme>
        </Switch>
      </Router>
    </Provider>
  );
}