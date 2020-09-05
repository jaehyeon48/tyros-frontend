import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Cash = ({
  isAuthenticated
}) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div>

    </div>
  );
}

Cash.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Cash);
