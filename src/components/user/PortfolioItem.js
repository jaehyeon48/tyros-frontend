import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../modal/Modal';
import { deletePortfolio } from '../../actions/portfolioAction';

const PortfolioItem = ({
  portfolio,
  currentPortfolio,
  deletePortfolio
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPortfolioName, setEditPortfolioName] = useState(portfolio.portfolioName);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  }

  const handleEditPortfolio = () => {

  }

  const handleDeletePortfolio = () => {
    deletePortfolio(portfolio.portfolioId);
  }

  return (
    <React.Fragment>
      <div className="portfolio-item">
        <div className="portfolio-name">{portfolio.portfolioName}</div>
        <button className="btn btn-portfolio-edit" onClick={openEditModal}>EDIT</button>
        <button className="btn btn-portfolio-delete" onClick={handleDeletePortfolio}>DELETE</button>
        <span className={
          `select-notice 
        ${portfolio.portfolioId === currentPortfolio
            ? "selected-portfolio" : "not-selected-portfolio"}`}>SELECTED</span>
      </div>
      {isEditModalOpen ? (
        <Modal closeModalFunc={closeEditModal}>
          <div className="portfolio-form">
            <label className="portfolio-form-label">Portfolio Name: </label>
            <input
              type="text"
              value={editPortfolioName}
              onChange={setEditPortfolioName}
              className="portfolio-form-field"
            />
            <button className="btn portfolio-form-edit-btn">EDIT</button>
          </div>
        </Modal>
      ) : null}
    </React.Fragment>
  )
}

export default connect(null, { deletePortfolio })(PortfolioItem);