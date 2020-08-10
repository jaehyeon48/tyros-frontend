import React from 'react';
import { connect } from 'react-redux';

import './maintheme.css';

const MainTheme = ({
  children,
  theme
}) => {
  return (
    <div className={theme === 'dark' ? 'main--dark-theme' : 'main--light-theme'}>
      {children}
    </div>
  );
}

const mapStateToProps = state => ({
  theme: state.auth.theme
});

export default connect(mapStateToProps)(MainTheme);