import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import StockGroupItem from './StockGroupItem';
import Modal from '../modal/Modal';
import {
  getStocksByTickerGroup,
  closePosition
} from '../../actions/stockAction';
import { showAlert } from '../../actions/alertAction';
import { getCompanyInfo } from '../../utils/getCompanyInfo';
import './positionDetail.css';
import EditTransaction from './EditTransaction';
import CompanyInfo from './CompanyInfo';

const PositionDetail = ({
  match,
  stockGroup,
  getStocksByTickerGroup,
  closePosition,
  showAlert
}) => {
  let history = useHistory();
  const PORTFOLIO_ID = match.params.portfolioId;
  const TICKER = match.params.ticker;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    stockId: '',
    ticker: TICKER.toUpperCase(),
    price: '',
    quantity: '',
    transactionType: '',
    transactionDate: ''
  });
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    if (PORTFOLIO_ID && TICKER) {
      getStocksByTickerGroup(PORTFOLIO_ID, TICKER);
    }
  }, [PORTFOLIO_ID, TICKER]);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  }

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  }
  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  }

  const handleClosePosition = async () => {
    if (window.confirm('Do you really want to close this position?')) {
      const closePositionResult = await closePosition(PORTFOLIO_ID, TICKER);
      if (closePositionResult === 0) {
        history.push('/main');
      }
      else if (closePositionResult === -1) {
        showAlert('Something went wrong. Please try again!', 'fail');
      }
    }
  }

  useEffect(() => {
    (async () => {
      const companyInfoResult = await getCompanyInfo(TICKER);
      setCompanyInfo(companyInfoResult);
    })();
  }, [TICKER]);

  return (
    <div className="position-details">
      <div className="position-header">
        <span>{TICKER.toUpperCase()}</span>
        <span>{companyInfo && companyInfo.companyName}</span>
      </div>
      <button
        type="button"
        className="btn btn-company-info"
        onClick={openInfoModal}
      >See Company Info</button>
      <button
        type="button"
        className="btn btn-close-position"
        onClick={handleClosePosition}
      >ClosePosition</button>
      <div className="stock-group-container">
        <div className="stock-group-header">
          <span className="stock-group-header-price">Price</span>
          <span className="stock-group-header-quantity">Quantity</span>
          <span className="stock-group-header-type">Type</span>
          <span className="stock-group-header-date">Date</span>
        </div>
        <div className="stock-group-items">
          {stockGroup && stockGroup.map(item => (
            <StockGroupItem
              key={item.stockId}
              stockId={item.stockId}
              price={item.price}
              quantity={item.quantity}
              transactionType={item.transactionType}
              transactionDate={new Date(item.transactionDate).toJSON().slice(0, 10)}
              formData={formData}
              openEditModal={openEditModal}
              setFormData={setFormData}
            />))}
        </div>
      </div>
      {isEditModalOpen && (
        <Modal closeModalFunc={closeEditModal}>
          <EditTransaction
            formData={formData}
            setFormData={setFormData}
          />
        </Modal>
      )}
      {isInfoModalOpen && (
        <Modal closeModalFunc={closeInfoModal} overflowY={true}>
          <CompanyInfo companyInfo={companyInfo} />
        </Modal>
      )}
    </div>
  );
}

PositionDetail.propTypes = {
  match: PropTypes.object,
  getStocksByTickerGroup: PropTypes.func,
  closePosition: PropTypes.func,
  showAlert: PropTypes.func
};

const mapStateToProps = (state) => ({
  stockGroup: state.stock.stockGroup
});

export default connect(mapStateToProps, {
  getStocksByTickerGroup,
  closePosition,
  showAlert
})(PositionDetail);
