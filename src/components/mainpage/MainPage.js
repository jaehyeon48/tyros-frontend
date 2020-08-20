import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  loadPortfolios,
  selectPortfolio,
  getSelectedPortfolio
} from '../../actions/portfolioAction';
import './mainpage.css';

const MainPage = ({
  user,
  loading,
  isAuthenticated,
  portfolioList,
  currentPortfolio,
  loadPortfolios,
  selectPortfolio,
  getSelectedPortfolio
}) => {
  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  useEffect(() => { getSelectedPortfolio() }, [getSelectedPortfolio]);

  if (!isAuthenticated && !loading) {
    return <Redirect to="/login" />
  }

  const handleSelectPfChange = (e) => {
    selectPortfolio(e.target.value);
  }

  return (
    <div className="main-container">
      Initial Main Page
      <div className="portfolio-list-container">
        <select onChange={handleSelectPfChange} value={currentPortfolio !== null && currentPortfolio} readOnly>
          {portfolioList && portfolioList.map(portfolio => (
            <option
              key={portfolio.portfolioId}
              value={portfolio.portfolioId}
            >{portfolio.portfolioName}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

MainPage.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  portfolioList: PropTypes.array,
  currentPortfolio: PropTypes.number,
  loadPortfolios: PropTypes.func,
  selectPortfolio: PropTypes.func,
  getSelectedPortfolio: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  portfolioList: state.portfolio.portfolioList,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  loadPortfolios,
  selectPortfolio,
  getSelectedPortfolio
})(MainPage);