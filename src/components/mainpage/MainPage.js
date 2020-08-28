import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  loadPortfolios,
  getSelectedPortfolio
} from '../../actions/portfolioAction';
import {
  checkMarketStatus,
  getStocks,
  resetStockLoading
} from '../../actions/stockAction';
import { getCash } from '../../actions/cashAction';
import Modal from '../modal/Modal';
import SelectPortfolio from './SelectPortfolio';
import AddPosition from './AddPosition';
import AddCash from './AddCash';
import Stocks from '../stock/Stocks';
import ValuePieChart from './ValuePieChart';
import './mainpage.css';
import spinnerDark from '../../images/spinner-dark.gif';
import spinnerLight from '../../images/spinner-light.gif';

const MainPage = ({
  theme,
  loading,
  isAuthenticated,
  stock,
  totalCash,
  portfolioList,
  currentPortfolio,
  loadPortfolios,
  getSelectedPortfolio,
  checkMarketStatus,
  getStocks,
  getCash,
  resetStockLoading
}) => {
  const [isSelectPortfolioModalOpen, setIsSelectPortfolioModalOpen] = useState(false);
  const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false);
  const [isAddCashModalOpen, setIsAddCashModalOpen] = useState(false);
  const [totalDailyReturn, setTotalDailyReturn] = useState(0);
  const [totalOverallReturn, setTotalOverallReturn] = useState(0);
  const [dailyReturnPercent, setDailyReturnPercent] = useState(0);
  const [overallReturnPercent, setOverallReturnPercent] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cashToDisplay, setCashToDisplay] = useState(totalCash);

  useEffect(() => {
    if (currentPortfolio) {
      resetStockLoading();
      getStocks(currentPortfolio);
      getCash(currentPortfolio);
    }
  }, []);
  useEffect(() => { checkMarketStatus(); }, []);
  useEffect(() => { getSelectedPortfolio(); }, []);

  useEffect(() => {
    if (stock.stockList.length === 0 && currentPortfolio) {
      getStocks(currentPortfolio);
      getCash(currentPortfolio);
    }
  }, [currentPortfolio]);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);



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
      let sumOfDailyReturn = 0;
      stock.stockList.forEach(stock => {
        sumOfDailyReturn += stock.dailyReturn;
      });
      setTotalDailyReturn(parseFloat(sumOfDailyReturn.toFixed(2)));
    }
  }, [stock.stockList]);

  useEffect(() => {
    if (stock.stockList.length > 0) {
      let sumOfOverallReturn = 0;
      stock.stockList.forEach(stock => {
        sumOfOverallReturn += stock.overallReturn;
      });
      setTotalOverallReturn(parseFloat(sumOfOverallReturn.toFixed(2)));
    }
  }, [stock.stockList]);

  useEffect(() => {
    setDailyReturnPercent((totalDailyReturn / (totalOverallReturn + totalCost - totalDailyReturn) * 100));
  }, [totalDailyReturn, totalOverallReturn, totalCost]);

  useEffect(() => {
    setOverallReturnPercent(totalOverallReturn / totalCost * 100);
  }, [totalOverallReturn, totalCost]);

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

  const openSelectPortfolioModal = () => {
    setIsSelectPortfolioModalOpen(true);
  }

  const closeSelectPortfolioModal = () => {
    setIsSelectPortfolioModalOpen(false);
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
    if (totalDailyReturn > 0) return 'return-positive';
    else if (totalDailyReturn < 0) return 'return-negative';
    else return 'return-zero';
  }

  const colorOverallPL = () => {
    if (totalOverallReturn > 0) return 'return-positive';
    else if (totalOverallReturn < 0) return 'return-negative';
    else return 'return-zero';
  }

  const colorTotalValue = () => {
    let overallValue = totalOverallReturn + totalCost + cashToDisplay;
    if (overallValue > 0) return 'return-positive';
    else if (overallValue < 0) return 'return-negative';
    else return 'return-zero';
  }

  return (
    <React.Fragment>
      {portfolioList && portfolioList.length > 0 ? (
        <div className="main-container">
          {!stock.stockLoading ? (
            <React.Fragment>
              {stock.stockList.length > 0 ? (
                <React.Fragment>
                  <div className="display-return-container">
                    <div className="return-item daily-return">
                      <span>Daily Return</span>
                      <span className={`${colorDailyPL()}`}>{totalDailyReturn} ({totalDailyReturn > 0 && '+'}
                        {dailyReturnPercent.toFixed(2)}%)</span>
                    </div>
                    <div className="return-item overall-return">
                      <span>Overall Return</span>
                      <span className={`${colorOverallPL()}`}>{totalOverallReturn} ({totalOverallReturn > 0 && '+'}{overallReturnPercent.toFixed(2)}%)</span>
                    </div>
                    <div className="return-item total-value">
                      <span>Total Value</span>
                      <span className={`${colorTotalValue()}`}>{(totalOverallReturn + totalCost + cashToDisplay).toFixed(2)}</span>
                    </div>
                  </div>
                  <Stocks
                    totalDailyReturn={totalDailyReturn}
                    totalOverallReturn={totalOverallReturn}
                    setTotalDailyReturn={setTotalDailyReturn}
                    setTotalOverallReturn={setTotalOverallReturn}
                  />
                  {stock.stockList.length > 0 && <ValuePieChart stockListLength={stock.stockList.length} />}
                </React.Fragment>
              ) : <div className="notice-empty-stocklist">Please Add Your Stock First!</div>}
            </React.Fragment>
          ) : (
              <div className="mainpage-loading-spinner">
                {theme === 'dark' ? <img src={spinnerDark} alt="loading spinner" /> : <img src={spinnerLight} alt="loading spinner" />}
              </div>
            )}
          <div className="portfolio-actions">
            <button
              type="button"
              className="btn btn-open-select-portfolio-modal"
              onClick={openSelectPortfolioModal}
            >SELECT PORTFOLIO</button>
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
      ) : <div className="notice-empty-portfoliolist">Portfolio Does Not Exist! Why Don't You Create Your First Portfolio?</div>}
      {isSelectPortfolioModalOpen && (
        <Modal closeModalFunc={closeSelectPortfolioModal}>
          <SelectPortfolio closeModalFunc={closeSelectPortfolioModal} />
        </Modal>
      )}
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
  checkMarketStatus: PropTypes.func,
  getSelectedPortfolio: PropTypes.func,
  getStocks: PropTypes.func,
  addTotalCost: PropTypes.func,
  getCash: PropTypes.func,
  resetStockLoading: PropTypes.func,
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
  getSelectedPortfolio,
  checkMarketStatus,
  getStocks,
  getCash,
  resetStockLoading
})(MainPage);