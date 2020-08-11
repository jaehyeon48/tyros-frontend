import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './landingpage.css';

const LandingPage = (isAuthenticated) => {
  if (isAuthenticated) {
    return <Redirect to="/main" />
  }

  return (
    <main className="landing-background">
      <header className="landing-header-filter">
        <div className="landing-header-title">
          <h1>Manage & Track your portfolio with <span>TYROS</span></h1>
        </div>
        <div className="landing-header-subtitle">
          TYROS, a pioneer of commission-free investing, gives you more ways to make your money work harder.
        </div>
      </header>
    </main>
  );
}

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth
});

export default connect(mapStateToProps)(LandingPage);