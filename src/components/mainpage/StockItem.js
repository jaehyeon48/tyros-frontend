import React from 'react';
import PropTypes from 'prop-types';

const StockItem = ({
  ticker,
  avgPrice,
  quantity
}) => {
  return (
    <div className="stock-item gain-positive">
      <span className="stock-item-ticker">{ticker.toUpperCase()}</span>
      <span className="stock-item-realtime"></span>
      <span className="stock-item-avgPrice">price: {avgPrice}</span>
      <span className="stock-item-quantity">quantity: {quantity}</span>
      <span className="stock-item-todayGain"></span>
      <span className="stock-item-totalGain"></span>
    </div>
  )
}

StockItem.propTypes = {
  ticker: PropTypes.string,
  avgPrice: PropTypes.number,
  quantity: PropTypes.number
};

export default StockItem;
