import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './navbar.css';
import mainLogoWhite from '../../images/tyros_logo_white.png';
import mainLogoBlack from '../../images/tyros_logo_black.png';

const Navbar = ({
  isAuthenticated,
  theme,
  user,
  history
}) => {
  const sideBarRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClickSidebar = async () => {
    if (isSidebarOpen) {
      sideBarRef.current.style = 'animation: closeSidebar 500ms';
      await new Promise(resolve => setTimeout(resolve, 400)); // wait for animation
      setIsSidebarOpen(!isSidebarOpen);
    }
    else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleClickLogo = () => {
    history.push('/');
    if (isSidebarOpen) {
      handleClickSidebar();
    }
  };

  const navGuest = (
    <React.Fragment>
      <Link to="/signup" className="navbar-signup">Sign Up</Link>
      <Link to="login" className="navbar-login">Login</Link>
      <div className="navbar-bars-icon" onClick={handleClickSidebar}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
      </div>
      {isSidebarOpen ? (
        <div ref={sideBarRef} className={`navbar-sidebar ${theme === 'dark' ? 'sidebar--dark-theme' : 'sidebar--light-theme'}`}>
          <div className="sidebar-content sidebar-signup">
            <Link to="signup" onClick={handleClickSidebar}>Sign Up</Link>
          </div>
          <div className="sidebar-content sidebar-login">
            <Link to="login" onClick={handleClickSidebar}>Login</Link>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
  const navAuth = (
    <React.Fragment></React.Fragment>
  );

  return (
    <nav className={`navbar ${theme === 'dark' ? 'navbar--dark-theme' : 'navbar--light-theme'}`}>
      <img src={theme === 'dark' ? mainLogoWhite : mainLogoBlack} alt="main logo" className="main-logo" onClick={handleClickLogo} />
      {isAuthenticated ? navAuth : navGuest}
    </nav>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.auth.theme,
  user: state.auth.user
});

export default connect(mapStateToProps)(withRouter(Navbar));