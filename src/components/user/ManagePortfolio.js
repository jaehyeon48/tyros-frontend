import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PortfolioItem from './PortfolioItem';
import {
  loadPortfolios,
  selectCurrentPortfolio
} from '../../actions/portfolioAction';
import './portfolio.css';

import { createPortfolio } from '../../actions/portfolioAction';

const ManagePortfolio = ({
  portfolioList,
  currentPortfolio,
  loadPortfolios,
  selectCurrentPortfolio,
  createPortfolio
}) => {
  useEffect(() => { loadPortfolios() }, [loadPortfolios]);
  useEffect(() => { selectCurrentPortfolio() }, [selectCurrentPortfolio]);

  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  const [isPortfolioNameError, setIsPortfolioNameError] = useState(false);

  useEffect(() => {
    if (isErrorOccurred && newPortfolioName.trim() !== '') {
      setIsPortfolioNameError(false);
    }
    else if (isErrorOccurred && newPortfolioName.trim() === '') {
      setIsPortfolioNameError(true);
    }
  }, [newPortfolioName, isErrorOccurred]);

  const handleChange = (e) => {
    setNewPortfolioName(e.target.value);
  }

  const handleAddNewPortfolio = () => {
    if (newPortfolioName.trim() === '') {
      setIsPortfolioNameError(true);
      setIsErrorOccurred(true);
    }
    else {
      createPortfolio(newPortfolioName);
    }
  }

  return (
    <React.Fragment>
      <div className="new-portfolio-form-container">
        <input
          type="text"
          value={newPortfolioName}
          onChange={handleChange}
          className={`new-portfolio-form-field ${isPortfolioNameError ? "form-field-error" : null}`}
        />
        {isPortfolioNameError ? <small className="new-portfolio-error-notice">Please enter valid name.</small> : null}
        <button className="btn btn-new-portfolio" onClick={handleAddNewPortfolio} disabled={isPortfolioNameError}>ADD NEW PORTFOLIO</button>
      </div>
      <div className="portfolios-container">
        {portfolioList.length > 0 ? portfolioList.map((portfolio) => (
          <PortfolioItem
            key={portfolio.portfolioId}
            portfolio={portfolio}
            currentPortfolio={currentPortfolio}
          />
        )) : <div className="no-portfolio-notice">CREATE YOUR FIRST PORTFOLIO!</div>}
      </div>
    </React.Fragment>
  );
}

ManagePortfolio.propTypes = {
  portfolioList: PropTypes.array,
  currentPortfolio: PropTypes.number,
  loadPortfolios: PropTypes.func,
  selectCurrentPortfolio: PropTypes.func,
  createPortfolio: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolioList: state.portfolio.portfolioList,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  loadPortfolios,
  selectCurrentPortfolio,
  createPortfolio
})(ManagePortfolio);
