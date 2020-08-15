import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './modal.css';

const Modal = ({
  closeModalFunc,
  children,
  theme,
}) => {
  return (
    <div className="modal-background">
      <div className={`modal-content ${theme === 'dark' ? "modal-content-bg-dark" : "modal-content-bg-light"}`}>
        <span className="close-modal-btn" onClick={closeModalFunc}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </span>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {

}

const mapStateToProps = (state) => ({
  theme: state.auth.theme
});

export default connect(mapStateToProps)(Modal);
