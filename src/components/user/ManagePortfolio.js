import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPortfolios } from '../../actions/portfolioAction';

const ManagePortfolio = ({
  portfolioList,
  loadPortfolios
}) => {
  useEffect(() => { loadPortfolios() }, [loadPortfolios]);

  return (
    <div>

    </div>
  );
}

ManagePortfolio.propTypes = {
  portfolioList: PropTypes.array,
  loadPortfolios: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolioList: state.portfolio.portfolioList
});

export default connect(mapStateToProps, { loadPortfolios })(ManagePortfolio);
