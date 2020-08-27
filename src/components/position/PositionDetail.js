import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StockGroupItem from './StockGroupItem';
import Modal from '../modal/Modal';
import { getStocksByTickerGroup } from '../../actions/stockAction';
import { getCompanyInfo } from '../../utils/getCompanyInfo';
import './positionDetail.css';
import EditPosition from './EditPosition';
import CompanyInfo from './CompanyInfo';

const PositionDetail = ({
  match,
  stockGroup,
  getStocksByTickerGroup
}) => {
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
          <EditPosition
            formData={formData}
            setFormData={setFormData}
          />
        </Modal>
      )}
      {isInfoModalOpen && (
        <Modal closeModalFunc={closeInfoModal}>
          <CompanyInfo companyInfo={companyInfo} />
        </Modal>
      )}
    </div>
  );
}

PositionDetail.propTypes = {
  match: PropTypes.object,
  getStocksByTickerGroup: PropTypes.func,
};

const mapStateToProps = (state) => ({
  stockGroup: state.stock.stockGroup
});

export default connect(mapStateToProps, { getStocksByTickerGroup })(PositionDetail);
