import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StockItem from './StockItem';

const Stocks = ({
  stock
}) => {
  return (
    <div>

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
