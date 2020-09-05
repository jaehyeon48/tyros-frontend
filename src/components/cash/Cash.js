import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Cash = ({
  loading,
  isAuthenticated,
}) => {
  if (!loading && !isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div>

    </div>
  );
}

Cash.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {})(Cash);
