import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import StockItem from './StockItem';
import Modal from '../modal/Modal';
import AddTransaction from './AddTransaction';
import Spinner from '../spinner/Spinner';
import { getStocks } from '../../actions/stockAction';
import { getSelectedPortfolio } from '../../actions/portfolioAction';
import './stocks.css';

const Stocks = ({
  isAuthenticated,
  stock,
  currentPortfolio,
  getStocks,
  getSelectedPortfolio
}) => {
  const [currentPortfolioId, setCurrentPortfolioId] = useState();
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);

  useEffect(() => {
    getSelectedPortfolio();
    setCurrentPortfolioId((prevId) => {
      if (prevId !== currentPortfolio) {
        return currentPortfolio;
      }
      else return prevId;
    });
  }, [currentPortfolio]);

  useEffect(() => {
    if (currentPortfolioId) {
      getStocks(currentPortfolioId);
    }
  }, [currentPortfolioId]);

  const openAddTransactionModal = () => {
    setIsAddTransactionModalOpen(true);
  }

  const closeAddTransactionModal = () => {
    setIsAddTransactionModalOpen(false);
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-open-add-transaction-modal"
        onClick={openAddTransactionModal}
      >ADD TRANSACTION</button>
      {stock && !stock.stockLoading ? (
        <React.Fragment>
          <div className="stocks-container">
            {stock.stockList && stock.stockList.map(eachStock => (
              <StockItem
                key={eachStock.ticker}
                ticker={eachStock.ticker}
                avgCost={eachStock.avgCost}
                quantity={eachStock.quantity}
              />
            ))}
          </div>
          {isAddTransactionModalOpen && <Modal closeModalFunc={closeAddTransactionModal} overflowY={true}>
            <AddTransaction closeAddTransactionModal={closeAddTransactionModal} />
          </Modal>}
        </React.Fragment>
      ) : <Spinner />}
    </React.Fragment>
  );
}

Stocks.propTypes = {
  isAuthenticated: PropTypes.bool,
  stock: PropTypes.object,
  currentPortfolio: PropTypes.number,
  getStocks: PropTypes.func,
  getSelectedPortfolio: PropTypes.func
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  stock: state.stock,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  getStocks,
  getSelectedPortfolio
})(Stocks);
