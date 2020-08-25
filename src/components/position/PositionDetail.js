import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getStocksByTickerGroup } from '../../actions/stockAction';
import './positionDetail.css';

const PositionDetail = ({
  match,
  getStocksByTickerGroup
}) => {
  const PORTFOLIO_ID = match.params.portfolioId;
  const TICKER = match.params.ticker;

  useEffect(() => {
    if (PORTFOLIO_ID && TICKER) {
      getStocksByTickerGroup(PORTFOLIO_ID, TICKER);
    }
  }, [PORTFOLIO_ID, TICKER]);

  return (
    <div>
    </div>
  );
}

PositionDetail.propTypes = {
  match: PropTypes.object,
  getStocksByTickerGroup: PropTypes.func,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getStocksByTickerGroup })(PositionDetail);
