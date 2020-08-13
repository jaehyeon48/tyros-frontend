import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PortfolioItem from './PortfolioItem';
import { loadPortfolios } from '../../actions/portfolioAction';
import './portfolio.css';

const ManagePortfolio = ({
  portfolioList,
  currentPortfolio,
  loadPortfolios
}) => {
  useEffect(() => { loadPortfolios() }, [loadPortfolios]);

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
  currentPortfolio: PropTypes.object,
  loadPortfolios: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolioList: state.portfolio.portfolioList,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, { loadPortfolios })(ManagePortfolio);
