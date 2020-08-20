import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './alert.css';

const Alert = ({ alert }) => {
  const alertTypeBgColor = (alertType) => {
    switch (alertType) {
      case 'success':
        return 'alert-bg-color-success';
      case 'warning':
        return 'alert-bg-color-warning';
      case 'fail':
        return 'alert-bg-color-fail';
      default:
        return;
    }
  }

  return (
    <React.Fragment>
      {alert && alert.isAlertOn && (
        <div className="alert-container">
          <div className={`alert ${alertTypeBgColor(alert.alertType)}`}>{alert.alertMessage}</div>
        </div>
      )}
    </React.Fragment>
  );
}

Alert.propTypes = {
  alert: PropTypes.object
}

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
