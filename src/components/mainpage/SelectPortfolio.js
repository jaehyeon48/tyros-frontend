import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getStocks } from '../../actions/stockAction';
import { selectPortfolio } from '../../actions/portfolioAction';

const SelectPortfolio = ({
  portfolioList,
  selectPortfolio,
  closeModalFunc
}) => {
  const handleSelectPortfolio = (id) => {
    selectPortfolio(id)
    closeModalFunc();
    window.location.reload();
  }

  return (
    <div className="portfolio-list-container">
      {portfolioList.length > 0 && portfolioList.map(portfolio => (
        <div
          key={portfolio.portfolioId}
          className="portfolio-list-item"
          onClick={() => handleSelectPortfolio(portfolio.portfolioId)}
        >{portfolio.portfolioName}</div>
      ))}
    </div>
  );
}

SelectPortfolio.propTypes = {
  portfolioList: PropTypes.array,
  selectPortfolio: PropTypes.func,
  closeModalFunc: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolioList: state.portfolio.portfolioList
});

export default connect(mapStateToProps, { selectPortfolio })(SelectPortfolio);
