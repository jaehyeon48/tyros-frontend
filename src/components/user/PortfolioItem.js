import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../modal/Modal';
import {
  editPortfolio,
  deletePortfolio
} from '../../actions/portfolioAction';

const PortfolioItem = ({
  portfolio,
  currentPortfolio,
  editPortfolio,
  deletePortfolio
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPortfolioName, setEditPortfolioName] = useState(portfolio.portfolioName);
  const [isNameEmptyErr, setIsNameEmptyErr] = useState(false);
  const [isPfNameEmpty, setIsPfNameEmpty] = useState(false);
  const [isEditFail, setIsEditFail] = useState(false);

  useEffect(() => {
    if (isNameEmptyErr && editPortfolioName.trim() !== '') {
      setIsPfNameEmpty(false);
    }
    else if (isNameEmptyErr && editPortfolioName.trim() === '') {
      setIsPfNameEmpty(true);
    }
  }, [editPortfolioName, isNameEmptyErr]);


  const openEditModal = () => {
    setIsEditModalOpen(true);
  }

  const closeEditModal = () => {
    setIsNameEmptyErr(false);
    setIsPfNameEmpty(false);
    setIsEditFail(false);
    setIsEditModalOpen(false);
  }

  const handleEditPfName = (e) => {
    setEditPortfolioName(e.target.value);
  }

  const handleEditPortfolio = async () => {
    setIsNameEmptyErr(false);
    setIsPfNameEmpty(false);
    setIsEditFail(false);
    if (editPortfolioName.trim() === '') {
      setIsPfNameEmpty(true);
      setIsNameEmptyErr(true);
    }
    else {
      const isNameDuplicate = await editPortfolio(portfolio.portfolioId, editPortfolioName);
      if (!isNameDuplicate) {
        closeEditModal();
      }
      else {
        setIsEditFail(isNameDuplicate);
      }
    }
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
      {isEditModalOpen &&
        <Modal closeModalFunc={closeEditModal}>
          <div className="portfolio-form">
            <label
              className={`portfolio-form-label ${(isEditFail || isPfNameEmpty) && "form-label-error"}`}
            >Portfolio Name: </label>
            <input
              type="text"
              value={editPortfolioName}
              onChange={handleEditPfName}
              className={`portfolio-form-field ${(isEditFail || isPfNameEmpty) && "form-field-error"}`}
            />
            {isEditFail && <small className="notice-pf-name-error">Name is duplicated!</small>}
            {isPfNameEmpty && <small className="notice-pf-name-error">Name is Empty!</small>}
            <button className="btn portfolio-form-btn pf-edit-btn" onClick={handleEditPortfolio}>EDIT</button>
          </div>
        </Modal>}
    </React.Fragment>
  )
}

PortfolioItem.propTypes = {
  editPortfolio: PropTypes.func,
  deletePortfolio: PropTypes.func
};

export default connect(null, {
  editPortfolio,
  deletePortfolio
})(PortfolioItem);