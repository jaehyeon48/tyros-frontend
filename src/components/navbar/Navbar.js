import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './navbar.css';
import logo from '../../images/tyros_logo_white.png';

const Navbar = ({
  isAuthenticated
}) => {
  return (
    <nav className="navbar navbar--dark-theme">
      <img src={logo} alt="main logo" />
    </nav>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(Navbar));