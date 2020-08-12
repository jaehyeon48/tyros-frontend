import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PortfolioItem from './PortfolioItem';
import { loadPortfolios } from '../../actions/portfolioAction';

const ManagePortfolio = ({
  portfolioList,
  loadPortfolios
}) => {
  useEffect(() => { loadPortfolios() }, [loadPortfolios]);

  return (
    <div>
      {portfolioList.map((portfolio) => (
        <PortfolioItem portfolio={portfolio} />
      ))}
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
