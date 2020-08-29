import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  editStock,
  deleteStock
} from '../../actions/stockAction';

const EditTransaction = ({
  formData,
  setFormData,
  editStock,
  deleteStock
}) => {
  const { ticker, price, quantity, transactionType, transactionDate } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editResult = await editStock(formData);
    if (editResult === 0) {
      window.location.reload();
    }
  }

  const handleDeleteTransaction = async (stockId) => {
    const deleteResponse = await deleteStock(stockId);
    if (deleteResponse === 0) {
      window.location.reload();
    }
    else {

    }
  }

  return (
    <div className="add-transaction-container">
      <form autoComplete="off" onSubmit={handleSubmit} className="add-transaction-form">
        <div className="transaction-type-container">
          <label>BUY
          <input
              type="radio"
              name="transactionType"
              value="buy"
              checked={transactionType === 'buy'}
              onChange={handleChange}
            />
          </label>
          <label>SELL
          <input
              type="radio"
              name="transactionType"
              value="sell"
              checked={transactionType === 'sell'}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="ticker-container">
          <label className="add-transaction-inputs">
            Ticker
          <input
              type="text"
              name="ticker"
              value={ticker}
              className="add-transaction-field"
              disabled={true}
            />
          </label>
        </div>
        <label className="add-transaction-inputs">
          Price
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="add-transaction-field"
            required={true}
          />
        </label>
        <label className="add-transaction-inputs">
          Quantity
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="add-transaction-field"
            required={true}
          />
        </label>
        <label className="add-transaction-inputs">
          Date
          <input
            type="date"
            name="transactionDate"
            value={transactionDate}
            onChange={handleChange}
            className="add-transaction-date-field"
          />
        </label>
        <button type="submit" className="btn btn-add-transaction">EDIT TRANSACTION</button>
      </form>
      <button
        type="button"
        className="btn btn-delete-transaction"
        onClick={() => handleDeleteTransaction(formData.stockId)}
      >DELETE TRANSACTION</button>
    </div>
  );
}

EditTransaction.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  editStock: PropTypes.func,
  deleteStock: PropTypes.func
};

export default connect(null, {
  editStock,
  deleteStock
})(EditTransaction);
