import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import tickerAutoComplete from '../../utils/tickerAutoComplete';
import AutoCompleteResult from './autoCompleteResult';
import './addStockForm.css';

const AddStockForm = props => {
  const [formData, setFormData] = useState({
    ticker: '',
    pricePerShare: '',
    quantity: '',
    transactionDate: new Date().toJSON().slice(0, 10),
    transactionType: 'buy'
  });
  const [tickerInput, setTickerInput] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [renderAutoComplete, setRenderAutoComplete] = useState(false);

  const { ticker, pricePerShare, quantity, transactionDate, transactionType } = formData;

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

  const handleClickItem = (ticker) => {
    setFormData({ ...formData, ticker });
    setRenderAutoComplete(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  return (
    <div className="add-stock-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
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
        <label>
          Ticker
          <input
            type="text"
            name="ticker"
            value={ticker}
            onChange={handleChange}
            onInput={handleTickerInput}
          />
        </label>
        {renderAutoComplete && <AutoCompleteResult
          results={autoCompleteResults}
          userInput={tickerInput}
          handleClickItem={handleClickItem}
        />}
      </form>
    </div>
  );
}

AddStockForm.propTypes = {

}

export default AddStockForm;
