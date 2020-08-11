import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './mainpage.css';

const MainPage = ({
  isAuthenticated
}) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div className="main-container">
      Initial Main Page
    </div>
  );
}

MainPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MainPage);