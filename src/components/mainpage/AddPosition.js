import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import tickerAutoComplete from '../../utils/tickerAutoComplete';
import AutoCompleteResult from './AutoCompleteResult';
import './addPosition.css';

import { addStock } from '../../actions/stockAction';
import { showAlert } from '../../actions/alertAction';

const AddPosition = ({
  closeAddPositionModal,
  currentPortfolio,
  addStock,
  showAlert
}) => {
  const [formData, setFormData] = useState({
    ticker: '',
    price: '',
    quantity: '',
    companyName: '',
    transactionDate: new Date().toJSON().slice(0, 10),
    transactionType: 'buy'
  });
  const [tickerInput, setTickerInput] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [renderAutoComplete, setRenderAutoComplete] = useState(false);

  const { ticker, price, quantity, companyName, transactionDate, transactionType } = formData;

  useEffect(() => {
    if (autoCompleteResults.length > 0) setRenderAutoComplete(true);
    else setRenderAutoComplete(false);
  }, [autoCompleteResults]);


  const handleTickerInput = (e) => {
    setTickerInput(e.target.value);
    if (e.target.value.trim() === '') return setAutoCompleteResults([]);
    const tickerResult = tickerAutoComplete(e.target.value);
    setAutoCompleteResults(tickerResult);
  }

  const handleClickItem = (ticker, companyName) => {
    setFormData({ ...formData, ticker, companyName });
    setRenderAutoComplete(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addStockResult = await addStock(currentPortfolio, formData);

    if (addStockResult === 0) {
      showAlert('The position was successfully added!', 'success');
    }
    else {
      showAlert('Something went wrong. Please try again!', 'fail');
    }
    closeAddPositionModal();
  }

  const handleChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  return (
    <div className="add-stock-container">
      <form autoComplete="off" onSubmit={handleSubmit} className="add-stock-form">
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
          <label className="add-stock-inputs">
            Ticker
          <input
              type="text"
              name="ticker"
              value={ticker}
              onChange={handleChange}
              onInput={handleTickerInput}
              className="add-stock-field"
            />
          </label>
          {renderAutoComplete && <AutoCompleteResult
            results={autoCompleteResults}
            userInput={tickerInput}
            handleClickItem={handleClickItem}
          />}
        </div>
        <label className="add-stock-inputs">
          Price
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="add-stock-field"
          />
        </label>
        <label className="add-stock-inputs">
          Quantity
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="add-stock-field"
          />
        </label>
        <label className="add-stock-inputs">
          Date
          <input
            type="date"
            name="transactionDate"
            value={transactionDate}
            onChange={handleChange}
            className="add-stock-date-field"
          />
        </label>
        <button type="submit" className="btn btn-add-position">Add Position</button>
      </form>
    </div>
  );
}

AddPosition.propTypes = {
  closeAddPositionModal: PropTypes.func,
  currentPortfolio: PropTypes.number,
  addStock: PropTypes.func,
  showAlert: PropTypes.func
}

const mapStateToProps = (state) => ({
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  addStock,
  showAlert
})(AddPosition);
