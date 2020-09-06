import React from 'react';
import PropTypes from 'prop-types';

const CashItem = ({
  amount,
  transactionType,
  transactionDate
}) => {
  return (
    <div className="cash-item">
      <span className="cash-item-amount">{amount}</span>
      <span className="cash-item-type">{transactionType}</span>
      <span className="cash-item-date">{transactionDate}</span>
      <button type="button" className="btn btn-edit-cash">EDIT</button>
      <button type="button" className="btn btn-delete-cash">DELETE</button>
    </div>
  );
}

CashItem.propTypes = {
  amount: PropTypes.number,
  transactionType: PropTypes.string,
};

export default CashItem;
