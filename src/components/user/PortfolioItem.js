import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deletePortfolio } from '../../actions/portfolioAction';

const PortfolioItem = ({
  portfolio,
  currentPortfolio,
  deletePortfolio
}) => {
  const handleDeletePortfolio = () => {
    deletePortfolio(portfolio.portfolioId);
  }

  return (
    <div className="portfolio-item">
      <div className="portfolio-name">{portfolio.portfolioName}</div>
      <button className="btn btn-portfolio-edit">EDIT</button>
      <button className="btn btn-portfolio-delete" onClick={handleDeletePortfolio}>DELETE</button>
      <span className={
        `select-notice 
        ${portfolio.portfolioId === currentPortfolio
          ? "selected-portfolio" : "not-selected-portfolio"}`}>SELECTED</span>
    </div>
  )
}

export default connect(null, { deletePortfolio })(PortfolioItem);