import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './positionDetail.css';

const PositionDetail = ({
  match
}) => {
  const PORTFOLIO_ID = match.params.portfolioId;
  const TICKER = match.params.ticker;

  return (
    <div>
    </div>
  );
}

PositionDetail.propTypes = {
  match: PropTypes.object
};

export default connect()(PositionDetail);
