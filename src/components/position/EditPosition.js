import React from 'react';


const EditPosition = ({
  formData,
  setFormData
}) => {
  const { ticker, price, quantity, transactionType, transactionDate } = formData;

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
          <label className="add-position-inputs">
            Ticker
          <input
              type="text"
              name="ticker"
              value={ticker}
              className="add-position-field"
              disabled={true}
            />
          </label>
        </div>
        <label className="add-position-inputs">
          Price
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="add-position-field"
          />
        </label>
        <label className="add-position-inputs">
          Quantity
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="add-position-field"
          />
        </label>
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
        <button type="submit" className="btn btn-add-position">Edit Position</button>
      </form>
    </div>
  );
}

export default EditPosition;