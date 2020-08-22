import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StockItem from './StockItem';

const Stocks = ({
  stock
}) => {
  return (
    <div className="stocks-container">
      {stock && stock.stockList.map(eachStock => (
        <StockItem
          key={eachStock.ticker}
          ticker={eachStock.ticker}
          avgPrice={eachStock.avgCost}
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
