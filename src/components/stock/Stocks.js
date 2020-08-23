import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StockItem from './StockItem';
import './stocks.css';

const Stocks = ({
  stock
}) => {
  return (
    <div className="stocks-container">
      {stock && stock.stockList.map(eachStock => (
        <StockItem
          key={eachStock.ticker}
          ticker={eachStock.ticker}
          avgCost={eachStock.avgCost}
          quantity={eachStock.quantity}
        />
      ))}
    </div>
  );
}

Stocks.propTypes = {
  stock: PropTypes.object
};

const mapStateToProps = (state) => ({
  stock: state.stock
});

export default connect(mapStateToProps)(Stocks);
