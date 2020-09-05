import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import './charts.css';


const ValuePieChart = ({
  stockList,
  stockListLength,
  stockLoading,
  totalCash
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: '#e8f0fe',
      borderWidth: 1
    }]
  });
  const [tickerLabels, setTickerLabels] = useState([]);
  const [stockValueData, setStockValueData] = useState([]);

  function getRandomColor(i) {
    const colors = ['#F7A8D5', '#CA2F4C', '#F2AB59', '#CAD038', '#69C58B', '#0F4E52', '#134253', '#17A7AA', '#6F9BA9', '#4B3B57', '#0F4BBD'];
    if (i === 0) {
      return colors[0];
    }
    else {
      return colors[i % 10 + 1];
    }
  }

  // insert ticker into the chart's data label array
  useEffect(() => {
    if (!stockLoading && stockList && stockList.length > 0) {
      let newTickerLabels = ['CASH'];
      stockList.forEach(stock => {
        newTickerLabels.push(stock.ticker.toUpperCase());
      });
      setTickerLabels(newTickerLabels);
    }
  }, [stockList]);

  // initialize chart data labels, background colors and border colors
  useEffect(() => {
    let newColors = [];
    if (tickerLabels.length > 0) {
      for (let i = 0; i < tickerLabels.length; i++) {
        newColors.push(getRandomColor(i));
      }
      setChartData({
        labels: [...tickerLabels],
        datasets: [{
          data: [...chartData.datasets[0].data],
          backgroundColor: newColors,
          borderColor: '#e8f0fe',
          borderWidth: 1
        }]
      });
    }
  }, [tickerLabels]);

  // update each stocks return
  useEffect(() => {
    if (stockList.length === stockListLength) {
      let newChartData = new Array(stockListLength + 1);
      newChartData.splice(0, 1, totalCash)
      stockList.forEach((stock, index) => {
        if (stock.overallReturn !== null) {
          const overallReturn = parseFloat((stock.avgCost * stock.quantity + stock.overallReturn).toFixed(2));
          if (overallReturn > 0) {
            newChartData.splice(index + 1, 1, overallReturn);
          }
        }
      });
      setStockValueData(newChartData);
    }
  }, [stockList, totalCash]);

  // initialize stock's returns into chart data
  useEffect(() => {
    if (stockValueData.length > 0 && chartData.labels.length > 0) {
      let newColors = [];
      for (let i = 0; i < tickerLabels.length; i++) {
        newColors.push(getRandomColor(i));
      }
      setChartData({
        labels: [...tickerLabels],
        datasets: [{
          data: [...stockValueData],
          backgroundColor: newColors,
          borderColor: '#e8f0fe',
          borderWidth: 1
        }]
      });
    }
  }, [stockValueData]);

  useEffect(() => {
  }, [chartData]);

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: '#372750',
        padding: 20,
        fontSize: 16
      }
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          if (value) {
            const tickerName = context.chart.data.labels[context.dataIndex];
            let sum = 0;
            let dataArr = context.chart.data.datasets[0].data;
            dataArr.forEach(data => {
              sum += data;
            });
            let percentage = (value * 100 / sum).toFixed(2) + "%";
            return tickerName + '\n' + percentage;
          }
        },
        color: '#fff',
        anchor: 'end',
        align: 'start',
        offset: -10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 20,
        backgroundColor: (context) => {
          return context.dataset.backgroundColor;
        },
        font: {
          weight: 'bold',
          size: 16,
          family: 'Lato'
        },
        textAlign: 'center',
        padding: 7
      }
    }
  }

  return (
    <div className="chart-container value-pie-chart">
      <h1>Distribution By Value</h1>
      <div className="chart-wrapper">
        <Pie
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
}

ValuePieChart.propTypes = {
  stockList: PropTypes.array,
  totalCash: PropTypes.number,
  stockLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  stockList: state.stock.stockList,
  stockLoading: state.stock.stockLoading,
  totalCash: state.cash.totalCash
});

export default connect(mapStateToProps)(ValuePieChart);
