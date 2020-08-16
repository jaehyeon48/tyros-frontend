import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PortfolioItem from './PortfolioItem';
import {
  loadPortfolios,
  selectCurrentPortfolio
} from '../../actions/portfolioAction';
import './portfolio.css';

import Modal from '../modal/Modal';
import { createPortfolio } from '../../actions/portfolioAction';

const ManagePortfolio = ({
  portfolioList,
  currentPortfolio,
  loadPortfolios,
  selectCurrentPortfolio,
  createPortfolio
}) => {
  useEffect(() => { loadPortfolios() }, [loadPortfolios]);
  useEffect(() => { selectCurrentPortfolio() }, [selectCurrentPortfolio]);

  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [isNameEmptyErr, setIsNameEmptyErr] = useState(false);
  const [isPfNameEmpty, setIsPfNameEmpty] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddFail, setIsAddFail] = useState(false);

  useEffect(() => {
    if (isNameEmptyErr && newPortfolioName.trim() !== '') {
      setIsPfNameEmpty(false);
    }
    else if (isNameEmptyErr && newPortfolioName.trim() === '') {
      setIsPfNameEmpty(true);
    }
  }, [newPortfolioName, isNameEmptyErr]);

  const handleAddPfName = (e) => {
    setNewPortfolioName(e.target.value);
  }

  const handleAddPortfolio = async () => {
    setIsNameEmptyErr(false);
    setIsPfNameEmpty(false);
    setIsAddFail(false);
    if (newPortfolioName.trim() === '') {
      setIsPfNameEmpty(true);
      setIsNameEmptyErr(true);
    }
    else {
      const isNameDuplicate = await createPortfolio(newPortfolioName);
      if (!isNameDuplicate) {
        closeAddModal();
      }
      else {
        setIsAddFail(isNameDuplicate);
      }
    }
  }

  const openAddModal = () => {
    setIsAddModalOpen(true);
  }

  const closeAddModal = () => {
    setIsNameEmptyErr(false);
    setIsPfNameEmpty(false);
    setIsAddFail(false);
    setIsAddModalOpen(false);
  }

  return (
    <React.Fragment>
      <div className="portfolios-container">
        <button className="btn btn-new-portfolio" onClick={openAddModal} >ADD NEW PORTFOLIO</button>
        {portfolioList.length > 0 ? portfolioList.map((portfolio) => (
          <PortfolioItem
            key={portfolio.portfolioId}
            portfolio={portfolio}
            currentPortfolio={currentPortfolio}
          />
        )) : <div className="no-portfolio-notice">CREATE YOUR FIRST PORTFOLIO!</div>}
      </div>
      {isAddModalOpen ? (
        <Modal closeModalFunc={closeAddModal}>
          <div className="portfolio-form">
            <label
              className={`portfolio-form-label ${isAddFail || isPfNameEmpty ? "form-label-error" : null}`}
            >Portfolio Name: </label>
            <input
              type="text"
              value={newPortfolioName}
              onChange={handleAddPfName}
              className={`portfolio-form-field ${isAddFail || isPfNameEmpty ? "form-field-error" : null}`}
            />
            {isAddFail ? (
              <small className="notice-pf-name-error">Name is duplicated!</small>
            ) : null}
            {isPfNameEmpty ? (
              <small className="notice-pf-name-error">Name is Empty!</small>
            ) : null}
            <button
              className="btn portfolio-form-btn pf-add-btn"
              onClick={handleAddPortfolio}
              disabled={isPfNameEmpty}
            >CREATE</button>
          </div>
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

ManagePortfolio.propTypes = {
  portfolioList: PropTypes.array,
  currentPortfolio: PropTypes.number,
  loadPortfolios: PropTypes.func,
  selectCurrentPortfolio: PropTypes.func,
  createPortfolio: PropTypes.func
};

const mapStateToProps = (state) => ({
  portfolioList: state.portfolio.portfolioList,
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {
  loadPortfolios,
  selectCurrentPortfolio,
  createPortfolio
})(ManagePortfolio);
