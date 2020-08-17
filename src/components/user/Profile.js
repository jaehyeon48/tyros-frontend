import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Profile = ({
  loading,
  isAuthenticated
}) => {

  if (!isAuthenticated && !loading) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      profile test
    </div>
  )
}

Profile.propTypes = {
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Profile);
