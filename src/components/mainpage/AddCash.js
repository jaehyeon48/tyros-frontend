import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddCash = ({
  currentPortfolio,
  closeAddCashModal
}) => {
  const [formData, setFormData] = useState({
    amount: '',
    transactionType: 'deposit',
    transactionDate: new Date().toJSON().slice(0, 10)
  });

  const { amount, transactionType, transactionDate } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="add-position-container">
      <form autoComplete="off" onSubmit={handleSubmit} className="add-position-form">
        <div className="transaction-type-container">
          <label>DEPOSIT
          <input
              type="radio"
              name="transactionType"
              value="deposit"
              checked={transactionType === 'deposit'}
              onChange={handleChange}
            />
          </label>
          <label>WITHDRAW
          <input
              type="radio"
              name="transactionType"
              value="withdraw"
              checked={transactionType === 'withdraw'}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="ticker-container">
          <label className="add-position-inputs">
            AMOUNT
          <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              value={amount}
              onChange={handleChange}
              className="add-position-field"
            />
          </label>
        </div>
        <label className="add-position-inputs">
          Date
          <input
            type="date"
            name="transactionDate"
            value={transactionDate}
            onChange={handleChange}
            className="add-position-date-field"
          />
        </label>
        <button type="submit" className="btn btn-add-position">Add Cash</button>
      </form>
    </div>
  );
}

AddCash.propTypes = {
  currentPortfolio: PropTypes.number,
  closeAddCashModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps)(AddCash);
