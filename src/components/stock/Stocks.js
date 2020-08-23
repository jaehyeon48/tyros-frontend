import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StockItem from './StockItem';
import './stocks.css';

const Stocks = ({
  stock,
  sumOfTodayGain,
  sumOfTotalGain,
  setSumOfTodayGain,
  setSumOfTotalGain
}) => {
  return (
    <div className="stocks-container">
      {stock && stock.stockList.map(eachStock => (
        <StockItem
          key={eachStock.ticker}
          ticker={eachStock.ticker}
          avgCost={eachStock.avgCost}
          quantity={eachStock.quantity}
          sumOfTodayGain={sumOfTodayGain}
          sumOfTotalGain={sumOfTotalGain}
          setSumOfTodayGain={setSumOfTodayGain}
          setSumOfTotalGain={setSumOfTotalGain}
        />
      ))}
    </div>
  );
}

Stocks.propTypes = {
  stock: PropTypes.object,
  sumOfTodayGain: PropTypes.number,
  sumOfTotalGain: PropTypes.number,
  setSumOfTodayGain: PropTypes.func,
  setSumOfTotalGain: PropTypes.func
};

const mapStateToProps = (state) => ({
  stock: state.stock
});

export default connect(mapStateToProps)(Stocks);
