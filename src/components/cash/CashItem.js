import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteCash } from '../../actions/cashAction';
import { showAlert } from '../../actions/alertAction';

const CashItem = ({
  amount,
  cashId,
  transactionType,
  transactionDate,
  deleteCash,
  showAlert
}) => {
  const handleDeleteCash = async () => {
    if (window.confirm('Do you really want to delete the cash transaction record?')) {
      const deleteResult = await deleteCash(cashId);
      if (deleteResult === 0) {
        window.location.reload();
      }
      else {
        showAlert('Something went wrong. Please try again!', 'fail');
      }
    }
  }

  return (
    <div className="cash-item">
      <span className="cash-item-amount">{amount}</span>
      <span className="cash-item-type">{transactionType}</span>
      <span className="cash-item-date">{transactionDate}</span>
      <button type="button" className="btn btn-edit-cash">EDIT</button>
      <button
        type="button"
        className="btn btn-delete-cash"
        onClick={handleDeleteCash}>DELETE</button>
    </div>
  );
}

CashItem.propTypes = {
  amount: PropTypes.number,
  transactionType: PropTypes.string,
  deleteCash: PropTypes.func,
  showAlert: PropTypes.func
};

export default connect(null, {
  deleteCash,
  showAlert
})(CashItem);
