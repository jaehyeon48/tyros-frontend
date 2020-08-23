import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { findCompanyNameByTicker } from '../../utils/findNameByTicker';
import { getRealTimePrice } from '../../utils/getRealTimePrice';
import { getClosePrice } from '../../utils/getClosePrice';

const StockItem = ({
  stock,
  ticker,
  avgCost,
  quantity,
  sumOfTodayGain,
  sumOfTotalGain,
  setSumOfTodayGain,
  setSumOfTotalGain
}) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [stockPriceData, setStockPriceData] = useState({
    price: 0,
    change: 0,
    changePercent: 0.0
  });
  const [todayGain, setTodayGain] = useState(0);
  const [totalGain, setTotalGain] = useState(0);
  const [totalGainPercent, setTotalGainPercent] = useState(0.0);
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
      setTodayGain(Number((stockPriceData.change * quantity.toFixed(2))));
    }
  }, [quantity, stockPriceData.change]);

  useEffect(() => {
    if (stockPriceData.price) {
      setTotalGain(Number(((stockPriceData.price - avgCost) * quantity).toFixed(2)));
    }
  }, [stockPriceData.price, avgCost, quantity]);

  useEffect(() => {
    if (totalGain) {
      setTotalGainPercent(Number((totalGain / (avgCost * quantity) * 100).toFixed(2)));
    }
  }, [totalGain, avgCost, quantity]);

  useEffect(() => {
    if (todayGain) {
      setSumOfTodayGain(sumOfTodayGain += todayGain);
    }
  }, [todayGain]);

  useEffect(() => {
    if (totalGain) {
      setSumOfTotalGain(sumOfTotalGain += totalGain);
    }
  }, [totalGain]);

  return (
    <div className="stock-item gain-positive">
      <div className="stock-item-info">
        <span className="stock-item-ticker">{ticker.toUpperCase()}</span>
        <span className="stock-item-name">{findCompanyNameByTicker(ticker)}</span>
      </div>
      <span className="stock-item-realtime">{stockPriceData.price}</span>
      <span className="stock-item-avgPrice">Cost: {avgCost}</span>
      <span className="stock-item-quantity">Quantity: {quantity}</span>
      <span className="stock-item-todayGain">Today: {todayGain}({stockPriceData.changePercent}%)</span>
      <span className="stock-item-totalGain">Total: {totalGain}({totalGainPercent}%)</span>
    </div>
  )
}

StockItem.propTypes = {
  stock: PropTypes.object,
  ticker: PropTypes.string,
  avgCost: PropTypes.number,
  quantity: PropTypes.number,
  sumOfTodayGain: PropTypes.number,
  sumOfTotalGain: PropTypes.number,
  setSumOfTodayGain: PropTypes.func,
  setSumOfTotalGain: PropTypes.func
};

const mapStateToProps = (state) => ({
  stock: state.stock
});

export default connect(mapStateToProps)(StockItem);
