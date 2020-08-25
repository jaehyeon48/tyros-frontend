import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { findCompanyNameByTicker } from '../../utils/findNameByTicker';
import { getRealTimePrice } from '../../utils/getRealTimePrice';
import { getClosePrice } from '../../utils/getClosePrice';
import {
  editDailyPL,
  editOverallPL
} from '../../actions/stockAction';

const StockItem = ({
  stock,
  ticker,
  avgCost,
  quantity,
  currentPortfolio,
  editDailyPL,
  editOverallPL
}) => {
  let history = useHistory();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [stockPriceData, setStockPriceData] = useState({
    price: 0,
    change: 0,
    changePercent: 0
  });
  const [dailyPL, setDailyPL] = useState(0);
  const [overallPL, setOverallPL] = useState(0);
  const [overallPLPercent, setOverallPLPercent] = useState(0);

  useEffect(() => {
    let intervalId;
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
        intervalId = setInterval(async () => {
          const realTimeData = await getRealTimePrice(ticker);
          setStockPriceData({
            price: realTimeData.price,
            change: realTimeData.change,
            changePercent: realTimeData.changePercent
          });
        }, 5000);
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
    return () => clearInterval(intervalId);
  }, [stock.isMarketOpen, ticker]);

  useEffect(() => {
    if (stockPriceData.change !== null) {
      setDailyPL((stockPriceData.change * quantity));
    }
  }, [quantity, stockPriceData.change]);

  useEffect(() => {
    if (stockPriceData.price !== null) {
      setOverallPL(((stockPriceData.price - avgCost) * quantity));
    }
  }, [stockPriceData.price, avgCost, quantity]);

  useEffect(() => {
    if (overallPL) {
      setOverallPLPercent((overallPL / (avgCost * quantity) * 100));
    }
  }, [overallPL, avgCost, quantity]);


  useEffect(() => {
    editDailyPL(ticker, dailyPL);
  }, [dailyPL]);

  useEffect(() => {
    editOverallPL(ticker, overallPL);
  }, [overallPL]);

  const colorDailyPL = () => {
    if (dailyPL > 0) return 'pl-positive';
    else if (dailyPL < 0) return 'pl-negative';
    else return 'pl-zero';
  }

  const colorOverallPL = () => {
    if (overallPL > 0) return 'pl-positive';
    else if (overallPL < 0) return 'pl-negative';
    else return 'pl-zero';
  }

  const directToPositionDetailPage = () => {
    history.push(`/position/${currentPortfolio}/${ticker}`);
  }

  return (
    <React.Fragment>
      {quantity > 0 ? (
        <div className="stock-item" onClick={directToPositionDetailPage}>
          <div className="stock-item-info">
            <span className="stock-item-ticker">{ticker.toUpperCase()}</span>
            <span className="stock-item-name">{findCompanyNameByTicker(ticker)}</span>
          </div>
          <span className="stock-item-realtime">{stockPriceData.price}</span>
          <span className="stock-item-avgPrice">Cost: {avgCost}</span>
          <span className="stock-item-quantity">Quantity: {quantity}</span>
          <span className="stock-item-daily-pl">
            Daily: <span className={`stock-item-daily-pl ${colorDailyPL()}`}>
              {dailyPL.toFixed(2)}({stockPriceData.changePercent.toFixed(2)}%)</span>
          </span>
          <span className="stock-item-overall-pl">
            Overall: <span className={`stock-item-overall-pl ${colorOverallPL()}`}>
              {overallPL.toFixed(2)}({overallPLPercent.toFixed(2)}%)</span>
          </span>
        </div>
      ) : null}
    </React.Fragment>
  )
}

StockItem.propTypes = {
  stock: PropTypes.object,
  ticker: PropTypes.string,
  avgCost: PropTypes.number,
  quantity: PropTypes.number,
  currentPortfolio: PropTypes.number,
  totalDailyPL: PropTypes.number,
  totalOverallPL: PropTypes.number,
  setTotalDailyPL: PropTypes.func,
  setTotalOverallPL: PropTypes.func,
  editDailyPL: PropTypes.func,
  editOverallPL: PropTypes.func
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  editDailyPL,
  editOverallPL
})(StockItem);
