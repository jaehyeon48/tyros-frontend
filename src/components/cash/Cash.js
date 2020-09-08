import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CashItem from './CashItem';
import Spinner from '../spinner/Spinner';
import DollarSignIcon from '../icons/DollarSignIcon';
import Modal from '../modal/Modal';
import AddCash from './AddCash';
import './cash.css';
import { getSelectedPortfolio } from '../../actions/portfolioAction';
import {
  getTotalCash,
  getCash
} from '../../actions/cashAction';

const Cash = ({
  loading,
  isAuthenticated,
  currentPortfolio,
  cashLoading,
  totalCash,
  cashList,
  getSelectedPortfolio,
  getCash,
  getTotalCash
}) => {
  const [isAddCashModalOpen, setIsAddCashModalOpen] = useState(false);
  useEffect(() => {
    getSelectedPortfolio();
  }, []);

  useEffect(() => {
    if (currentPortfolio) {
      getCash(currentPortfolio);
      getTotalCash(currentPortfolio);
    }
  }, [currentPortfolio]);

  useEffect(() => {
    if (cashList.length > 0) {
    }
  }, [cashList]);

  const openAddCashModal = () => {
    setIsAddCashModalOpen(true);
  }

  const closeAddCashModal = () => {
    setIsAddCashModalOpen(false);
  }

  if (!loading && !isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <React.Fragment>
      {!cashLoading ? (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-open-add-cash-modal"
            onClick={openAddCashModal}
          >ADD CASH TRANSACTION</button>
          {cashList && cashList.length > 0 ? (
            <div className="cash-page">
              <div className="cash-total-amount">
                <span>Total Cash</span>
                <span><DollarSignIcon />{totalCash}</span>
              </div>
              <div className="cash-header">
                <span className="cash-header-amount">Amount</span>
                <span className="cash-header-type">Type</span>
                <span className="cash-header-date">Date</span>
              </div>
              <div className="cash-container">
                {cashList.map((cash) => (
                  <CashItem
                    key={cash.cashId}
                    cashId={cash.cashId}
                    amount={cash.amount}
                    transactionType={cash.transactionType}
                    transactionDate={new Date(cash.transactionDate).toJSON().slice(2, 10)}
                  />
                ))}
              </div>
            </div>
          ) : (<div className="notice-empty-cashlist">The cash list is empty. Add a cash transaction!</div>)}
          {isAddCashModalOpen && (
            <Modal closeModalFunc={closeAddCashModal}>
              <AddCash closeAddCashModal={closeAddCashModal} />
            </Modal>
          )}
        </React.Fragment>
      ) : (<Spinner />)}
    </React.Fragment>
  );
}

Cash.propTypes = {
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  currentPortfolio: PropTypes.number,
  cashLoading: PropTypes.bool,
  cashList: PropTypes.array,
  totalCash: PropTypes.number,
  getSelectedPortfolio: PropTypes.func,
  getCash: PropTypes.func,
  getTotalCash: PropTypes.func
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  currentPortfolio: state.portfolio.currentPortfolio,
  cashLoading: state.cash.cashLoading,
  cashList: state.cash.cashList,
  totalCash: state.cash.totalCash
});

export default connect(mapStateToProps, {
  getSelectedPortfolio,
  getCash,
  getTotalCash
})(Cash);
