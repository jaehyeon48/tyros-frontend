import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PortfolioItem from './PortfolioItem';
import {
  loadPortfolios,
  selectCurrentPortfolio
} from '../../actions/portfolioAction';
import './portfolio.css';

const ManagePortfolio = ({
  portfolioList,
  currentPortfolio,
  loadPortfolios,
  selectCurrentPortfolio
}) => {
  useEffect(() => { loadPortfolios() }, [loadPortfolios]);
  useEffect(() => { selectCurrentPortfolio() }, [selectCurrentPortfolio]);

  return (
    <div className="portfolios-container">
      {portfolioList.map((portfolio) => (
        <PortfolioItem
          key={portfolio.portfolioId}
          portfolio={portfolio}
          currentPortfolio={currentPortfolio}
        />
      ))}
    </div>
  );
}

ManagePortfolio.propTypes = {
  portfolioList: PropTypes.array,
  currentPortfolio: PropTypes.number,
  loadPortfolios: PropTypes.func,
  selectCurrentPortfolio: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolioList: state.portfolio.portfolioList,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  loadPortfolios,
  selectCurrentPortfolio
})(ManagePortfolio);
