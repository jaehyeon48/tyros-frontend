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
  getStocks,
} from '../../actions/stockAction';
import { getCash } from '../../actions/cashAction';
import Modal from '../modal/Modal';
import AddPosition from './AddPosition';
import AddCash from './AddCash';
import Stocks from '../stock/Stocks';
import './mainpage.css';
import SpinnerDark from '../../images/spinner-dark.gif';
import SpinnerLight from '../../images/spinner-light.gif';


const MainPage = ({
  theme,
  loading,
  isAuthenticated,
  stock,
  totalCash,
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
  const [totalDailyPL, setTotalDailyPL] = useState(0);
  const [totalOverallPL, setTotalOverallPL] = useState(0);
  const [dailyPLPercent, setDailyPLPercent] = useState(0);
  const [overallPLPercent, setOverallPLPercent] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cashToDisplay, setCashToDisplay] = useState(totalCash);


  useEffect(() => { checkMarketStatus(); }, []);

  useEffect(() => {
    getStocks(currentPortfolio);
    getCash(currentPortfolio);
  }, [currentPortfolio]);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  useEffect(() => { getSelectedPortfolio(); }, [getSelectedPortfolio]);

  useEffect(() => {
    if (stock.stockList.length > 0) {
      let sumOfCost = 0;
      stock.stockList.forEach(stock => {
        sumOfCost += (stock.avgCost * stock.quantity);
      });
      setTotalCost(parseFloat(sumOfCost.toFixed(2)));
    }
  }, [stock.stockList]);

  useEffect(() => {
    if (stock.stockList.length > 0) {
      let sumOfDailyPL = 0;
      stock.stockList.forEach(stock => {
        sumOfDailyPL += stock.dailyPL;
      });
      setTotalDailyPL(parseFloat(sumOfDailyPL.toFixed(2)));
    }
  }, [stock.stockList]);

  useEffect(() => {
    if (stock.stockList.length > 0) {
      let sumOfOverallPL = 0;
      stock.stockList.forEach(stock => {
        sumOfOverallPL += stock.overallPL;
      });
      setTotalOverallPL(parseFloat(sumOfOverallPL.toFixed(2)));
    }
  }, [stock.stockList]);

  useEffect(() => {
    setDailyPLPercent((totalDailyPL / (totalOverallPL + totalCost - totalDailyPL) * 100));
  }, [totalDailyPL, totalOverallPL, totalCost]);

  useEffect(() => {
    setOverallPLPercent(totalOverallPL / totalCost * 100);
  }, [totalOverallPL, totalCost]);

  useEffect(() => {
    if (totalCash < 0) {
      setCashToDisplay(0);
    }
    else {
      setCashToDisplay(totalCash);
    }
  }, [totalCash]);

  if (!isAuthenticated && !loading) {
    return <Redirect to="/login" />
  }

  const handleSelectPfChange = (e) => {
    setTotalDailyPL(0);
    setTotalOverallPL(0);
    setDailyPLPercent(0);
    setOverallPLPercent(0);
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

  const colorDailyPL = () => {
    if (totalDailyPL > 0) return 'pl-positive';
    else if (totalDailyPL < 0) return 'pl-negative';
    else return 'pl-zero';
  }

  const colorOverallPL = () => {
    if (totalOverallPL > 0) return 'pl-positive';
    else if (totalOverallPL < 0) return 'pl-negative';
    else return 'pl-zero';
  }

  const colorOverallValue = () => {
    let overallValue = totalOverallPL + totalCost + cashToDisplay;
    if (overallValue > 0) return 'pl-positive';
    else if (overallValue < 0) return 'pl-negative';
    else return 'pl-zero';
  }

  return (
    <React.Fragment>
      {portfolioList && portfolioList.length > 0 ? (
        <div className="main-container">
          {stock.stockList.length > 0 ? (
            <React.Fragment>
              {totalCost !== null || totalCost !== undefined ? (
                <React.Fragment>
                  <div
                    className={`daily-pl-container ${colorDailyPL()}`}
                  >DAILY P&L:&nbsp;&nbsp;{totalDailyPL} ({totalDailyPL > 0 ? '+' : null}
                    {dailyPLPercent.toFixed(2)}%)</div>
                  <div
                    className={`overall-pl-container ${colorOverallPL()}`}
                  >OVERALL P&L:&nbsp;&nbsp;{totalOverallPL} ({totalOverallPL > 0 ? '+' : null}{overallPLPercent.toFixed(2)}%)</div>
                  <div
                    className={`overall-value-container ${colorOverallValue()}`}>
                    TOTAL VALUE: ${(totalOverallPL + totalCost + cashToDisplay).toFixed(2)}
                  </div>
                </React.Fragment>
              ) : <img
                  src={theme === 'dark' ? SpinnerDark : SpinnerLight}
                  alt="loading spinner"
                  className="mainpage-pl-spinner"
                />}
            </React.Fragment>
          ) : <div className="notice-empty-stocklist">Please Add Your Stock First!</div>}
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
          <Stocks
            totalDailyPL={totalDailyPL}
            totalOverallPL={totalOverallPL}
            setTotalDailyPL={setTotalDailyPL}
            setTotalOverallPL={setTotalOverallPL}
          />
        </div>
      ) : <div className="notice-empty-portfoliolist">Portfolio Does Not Exist! Why Don't You Create Your First Portfolio?</div>}
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
  theme: PropTypes.string,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  totalCost: PropTypes.number,
  totalCash: PropTypes.number,
  portfolioList: PropTypes.array,
  currentPortfolio: PropTypes.number,
  loadPortfolios: PropTypes.func,
  selectPortfolio: PropTypes.func,
  checkMarketStatus: PropTypes.func,
  getSelectedPortfolio: PropTypes.func,
  getStocks: PropTypes.func,
  addTotalCost: PropTypes.func,
  getCash: PropTypes.func
};

const mapStateToProps = (state) => ({
  theme: state.auth.theme,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  stock: state.stock,
  totalCash: state.cash.totalCash,
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