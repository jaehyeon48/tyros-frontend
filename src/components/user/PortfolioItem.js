import React from 'react';

const PortfolioItem = ({
  portfolio
}) => {
  return (
    <div key={portfolio.portfolioId}>
      {portfolio.portfolioName}
    </div>
  )
}

export default PortfolioItem;