import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  loadPortfolios,
  selectPortfolio,
  getSelectedPortfolio
} from '../../actions/portfolioAction';
import {
  checkMarketStatus,
  getStocks
} from '../../actions/stockAction';
import { getCash } from '../../actions/cashAction';
import Modal from '../modal/Modal';
import AddPosition from './AddPosition';
import AddCash from './AddCash';
import Stocks from '../stock/Stocks';
import './mainpage.css';


const MainPage = ({
  user,
  loading,
  isAuthenticated,
  portfolioList,
  currentPortfolio,
  loadPortfolios,
  selectPortfolio,
  getSelectedPortfolio,
  checkMarketStatus,
  getStocks,
  getCash
}) => {
  const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false);
  const [isAddCashModalOpen, setIsAddCashModalOpen] = useState(false);

  useState(() => {
    checkMarketStatus();
  }, []);

  useEffect(() => {
    getStocks(currentPortfolio);
    getCash(currentPortfolio);
  }, [currentPortfolio]);

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

  const openAddPositionModal = () => {
    setIsAddPositionModalOpen(true);
  }
  const closeAddPositionModal = () => {
    setIsAddPositionModalOpen(false);
  }
  const openAddCashModal = () => {
    setIsAddCashModalOpen(true);
  }
  const closeAddCashModal = () => {
    setIsAddCashModalOpen(false);
  }

  return (
    <React.Fragment>
      <div className="main-container">
        <div className="portfolio-actions">
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
          <div className="add-buttons-container">
            <button
              type="button"
              className="btn btn-open-add-position-modal"
              onClick={openAddPositionModal}
            >ADD POSITION</button>
            <button
              type="button"
              className="btn btn-open-add-cash-modal"
              onClick={openAddCashModal}
            >ADD CASH</button>
          </div>
        </div>
        <Stocks />
      </div>
      {isAddPositionModalOpen && (
        <Modal closeModalFunc={closeAddPositionModal}>
          <AddPosition closeAddPositionModal={closeAddPositionModal} />
        </Modal>
      )}
      {isAddCashModalOpen && (
        <Modal closeModalFunc={closeAddCashModal}>
          <AddCash closeAddCashModal={closeAddCashModal} />
        </Modal>
      )}
    </React.Fragment>
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
  getSelectedPortfolio: PropTypes.func,
  checkMarketStatus: PropTypes.func,
  getStocks: PropTypes.func,
  getCash: PropTypes.func
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
  getSelectedPortfolio,
  checkMarketStatus,
  getStocks,
  getCash
})(MainPage);