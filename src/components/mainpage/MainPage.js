import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  loadPortfolios,
  selectCurrentPortfolio
} from '../../actions/portfolioAction';
import './mainpage.css';

const MainPage = ({
  user,
  isAuthenticated,
  portfolioList,
  currentPortfolio,
  loadPortfolios,
  selectCurrentPortfolio
}) => {
  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  useEffect(() => { selectCurrentPortfolio() }, [selectCurrentPortfolio]);

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
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  portfolioList: PropTypes.array,
  currentPortfolio: PropTypes.number,
  loadPortfolios: PropTypes.func,
  selectCurrentPortfolio: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  portfolioList: state.portfolio.portfolioList,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  loadPortfolios,
  selectCurrentPortfolio
})(MainPage);