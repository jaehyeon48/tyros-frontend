import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StockItem from './StockItem';
import './stocks.css';

const Stocks = ({
  stock,
  totalTodayPL,
  totalOverallPL,
  setTotalTodayPL,
  setTotalOverallPL
}) => {
  return (
    <div className="stocks-container">
      {stock && stock.stockList.map(eachStock => (
        <StockItem
          key={eachStock.ticker}
          ticker={eachStock.ticker}
          avgCost={eachStock.avgCost}
          quantity={eachStock.quantity}
          totalTodayPL={totalTodayPL}
          totalOverallPL={totalOverallPL}
          setTotalTodayPL={setTotalTodayPL}
          setTotalOverallPL={setTotalOverallPL}
        />
      ))}
    </div>
  );
}

Stocks.propTypes = {
  stock: PropTypes.object,
  totalTodayPL: PropTypes.number,
  totalOverallPL: PropTypes.number,
  setTotalTodayPL: PropTypes.func,
  setTotalOverallPL: PropTypes.func
};

const mapStateToProps = (state) => ({
  stock: state.stock
});

export default connect(mapStateToProps)(Stocks);
