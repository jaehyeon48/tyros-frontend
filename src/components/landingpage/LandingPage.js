import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './landingpage.css';

const LandingPage = ({
  loading,
  isAuthenticated
}) => {
  if (isAuthenticated && !loading) {
    return <Redirect to="/main" />
  }

  return (
    <React.Fragment>
      {!loading ? (
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
      ) : null}
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);