import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import './signup.css';

const SignUp = ({
  isAuthenticated
}) => {
  const [signupFormData, setSignupFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const { firstName, lastName, email, password } = signupFormData;

  function handleSubmit(e) {
    console.log(e.target);
  }

  function handleChange(e) {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value
    });
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  if (isAuthenticated) {
    return <Redirect to="/main" />
  }

  return (
    <React.Fragment>
      <div className="auth-form-container">
        <p className="auth-form-subtitle">Join TYROS</p>
        <h1 className="auth-form-title">CREATE YOUR ACCOUNT</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="auth-form-label">First Name</label>
            <input
              type="text"
              className="auth-form-field"
              name="firstName"
              value={firstName}
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div className="auth-form-group">
            <label className="auth-form-label">Last Name</label>
            <input
              type="text"
              className="auth-form-field"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
          <div className="auth-form-group">
            <label className="auth-form-label">Email</label>
            <input
              type="text"
              className="auth-form-field"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="auth-form-group">
            <label className="auth-form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="auth-form-field"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
            />
            <small className="auth-form-text">Password must be at least 8 characters long. </small>
          </div>
          <label className="auth-checkbox-container">Show password
            <input type="checkbox" onClick={handleShowPassword} />
            <span className="checkmark"></span>
          </label>
          <div className="auth-form-group">
            <button type="submit" className="btn auth-button">SIGN UP</button>
          </div>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </React.Fragment>
  );
}

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(SignUp);
