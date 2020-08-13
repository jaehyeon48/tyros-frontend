import React, { useEffect, useState } from 'react';
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

  const [newPortfolioName, setNewPortfolioName] = useState('');

  const handleChange = (e) => {
    setNewPortfolioName(e.target.value);
  }

  const handleAddNewPortfolio = () => {

  }

  return (
    <React.Fragment>
      <div className="new-portfolio-form-container">
        <label className="new-portfolio-label" onClick={handleAddNewPortfolio}>Add New Portfolio: </label>
        <input
          type="text"
          value={newPortfolioName}
          onChange={handleChange}
          className="new-portfolio-form-field"
        />
        <button className="btn btn-new-portfolio">ADD NEW PORTFOLIO</button>
      </div>
      <div className="portfolios-container">
        {portfolioList.map((portfolio) => (
          <PortfolioItem
            key={portfolio.portfolioId}
            portfolio={portfolio}
            currentPortfolio={currentPortfolio}
          />
        ))}
      </div>
    </React.Fragment>
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
