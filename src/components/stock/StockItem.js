import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTotalCost } from '../../actions/stockAction';
import { findCompanyNameByTicker } from '../../utils/findNameByTicker';
import { getRealTimePrice } from '../../utils/getRealTimePrice';
import { getClosePrice } from '../../utils/getClosePrice';

const StockItem = ({
  stock,
  ticker,
  avgCost,
  quantity,
  totalTodayPL,
  totalOverallPL,
  setTotalTodayPL,
  setTotalOverallPL,
  addTotalCost
}) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [stockPriceData, setStockPriceData] = useState({
    price: 0,
    change: 0,
    changePercent: 0.0
  });
  const [todayPL, setTodayPL] = useState(0);
  const [overallPL, setOverallPL] = useState(0);
  const [overallPLPercent, setOverallPLPercent] = useState(0.0);
  useEffect(() => {
    (async () => {
      if (stock.isMarketOpen) {
        if (isFirstRender) {
          setIsFirstRender(false);
          (async () => {
            const realTimeData = await getRealTimePrice(ticker);
            setStockPriceData({
              price: realTimeData.price,
              change: realTimeData.change,
              changePercent: realTimeData.changePercent
            });
          })();
        }
        const intervalId = setInterval(async () => {
          const realTimeData = await getRealTimePrice(ticker);
          setStockPriceData({
            price: realTimeData.price,
            change: realTimeData.change,
            changePercent: realTimeData.changePercent
          });
        }, 5000);
        return () => clearInterval(intervalId);
      }
      else {
        const closeData = await getClosePrice(ticker);
        setStockPriceData({
          price: closeData.price,
          change: closeData.change,
          changePercent: closeData.changePercent
        });
      }
    })();
  }, [stock.isMarketOpen]);

  useEffect(() => {
    if (stockPriceData.change) {
      setTodayPL(Number((stockPriceData.change * quantity.toFixed(2))));
    }
  }, [quantity, stockPriceData.change]);

  useEffect(() => {
    if (stockPriceData.price) {
      setOverallPL(Number(((stockPriceData.price - avgCost) * quantity).toFixed(2)));
    }
  }, [stockPriceData.price, avgCost, quantity]);

  useEffect(() => {
    if (overallPL) {
      setOverallPLPercent(Number((overallPL / (avgCost * quantity) * 100).toFixed(2)));
    }
  }, [overallPL, avgCost, quantity]);

  useEffect(() => {
    addTotalCost(avgCost * quantity);
  }, [avgCost, quantity]);

  useEffect(() => {
    if (todayPL) {
      setTotalTodayPL(totalTodayPL + todayPL);
    }
  }, [todayPL]);

  useEffect(() => {
    if (overallPL) {
      setTotalOverallPL(totalOverallPL + overallPL);
    }
  }, [overallPL]);

  const colorTodayPL = () => {
    if (todayPL > 0) return 'pl-positive';
    else if (todayPL < 0) return 'pl-negative';
    else return 'pl-zero';
  }

  const colorOverallPL = () => {
    if (overallPL > 0) return 'pl-positive';
    else if (overallPL < 0) return 'pl-negative';
    else return 'pl-zero';
  }

  return (
    <div className="stock-item">
      <div className="stock-item-info">
        <span className="stock-item-ticker">{ticker.toUpperCase()}</span>
        <span className="stock-item-name">{findCompanyNameByTicker(ticker)}</span>
      </div>
      <span className="stock-item-realtime">{stockPriceData.price}</span>
      <span className="stock-item-avgPrice">Cost: {avgCost}</span>
      <span className="stock-item-quantity">Quantity: {quantity}</span>
      <span
        className={`stock-item-today-pl ${colorTodayPL()}`}
      >Today: {todayPL}({stockPriceData.changePercent}%)</span>
      <span
        className={`stock-item-overall-pl ${colorOverallPL()}`}
      >Overall: {overallPL}({overallPLPercent}%)</span>
    </div>
  )
}

StockItem.propTypes = {
  stock: PropTypes.object,
  ticker: PropTypes.string,
  avgCost: PropTypes.number,
  quantity: PropTypes.number,
  totalTodayPL: PropTypes.number,
  totalOverallPL: PropTypes.number,
  setTotalTodayPL: PropTypes.func,
  setTotalOverallPL: PropTypes.func
};

const mapStateToProps = (state) => ({
  stock: state.stock
});

export default connect(mapStateToProps, { addTotalCost })(StockItem);
