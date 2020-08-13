import React from 'react';

const PortfolioItem = ({
  portfolio,
  currentPortfolio
}) => {
  return (
    <div className="portfolio-item">
      {portfolio.portfolioName}
      <button className="btn btn-portfolio-edit">EDIT</button>
      <button className="btn btn-portfolio-delete">DELETE</button>
      <span className={
        `select-notice 
        ${currentPortfolio && (portfolio.portfolioId === currentPortfolio.portfolioId)
          ? "selected-portfolio" : "not-selected-portfolio"}`}>SELECTED</span>
    </div>
  )
}

export default PortfolioItem;