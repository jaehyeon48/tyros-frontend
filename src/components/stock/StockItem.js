import React from 'react';
import PropTypes from 'prop-types';

import { findCompanyNameByTicker } from '../../utils/findNameByTicker';

const StockItem = ({
  ticker,
  avgCost,
  quantity
}) => {
  return (
    <div className="stock-item gain-positive">
      <div className="stock-item-info">
        <span className="stock-item-ticker">{ticker.toUpperCase()}</span>
        <span className="stock-item-name">{findCompanyNameByTicker(ticker)}</span>
      </div>
      <span className="stock-item-realtime"></span>
      <span className="stock-item-avgPrice">cost: {avgCost}</span>
      <span className="stock-item-quantity">quantity: {quantity}</span>
      <span className="stock-item-todayGain"></span>
      <span className="stock-item-totalGain"></span>
    </div>
  )
}

StockItem.propTypes = {
  ticker: PropTypes.string,
  avgCost: PropTypes.number,
  quantity: PropTypes.number
};

export default StockItem;
