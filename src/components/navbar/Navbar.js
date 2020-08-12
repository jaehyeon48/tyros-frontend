import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './navbar.css';
import mainLogoWhite from '../../images/tyros_logo_white.png';
import mainLogoBlack from '../../images/tyros_logo_black.png';
import defaultAvatar from '../../images/default_avatar.png';

import { logout } from '../../actions/authAction';

const Navbar = ({
  isAuthenticated,
  theme,
  user,
  history,
  logout
}) => {
  const sideBarRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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

  const handleClickSidebarLogout = () => {
    setIsSidebarOpen(false);
    logout();
  }

  const openProfileMenu = () => {
    setIsProfileMenuOpen(true);
  }

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  }

  const navGuest = (
    <React.Fragment>
      <Link to="/signup" className="navbar-signup">Sign Up</Link>
      <Link to="login" className="navbar-login">Login</Link>
      <div className="navbar-bars-icon" onClick={handleClickSidebar}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
      </div>
      {isSidebarOpen ? (
        <div ref={sideBarRef} className={`navbar-sidebar ${theme === 'dark' ? 'sidebar--dark-theme' : 'sidebar--light-theme'}`}>
          <div className="sidebar-close-btn-container">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" onClick={handleClickSidebar}><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
          </div>
          <div className="sidebar-content sidebar-signup">
            <Link to="/signup" onClick={handleClickSidebar}>Sign Up</Link>
          </div>
          <div className="sidebar-content sidebar-login">
            <Link to="/login" onClick={handleClickSidebar}>Login</Link>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
  const navAuth = (
    <React.Fragment>
      <div className="navbar-bars-icon" onClick={handleClickSidebar}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
      </div>
      {isSidebarOpen ? (
        <div ref={sideBarRef} className={`navbar-sidebar ${theme === 'dark' ? 'sidebar--dark-theme' : 'sidebar--light-theme'}`}>
          <div className="sidebar-close-btn-container">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" onClick={handleClickSidebar}><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
          </div>
          <div className="sidebar-content sidebar-avatar">
            <div className="navbar-user-avatar-container">
              <img src={defaultAvatar} alt="user avatar" className="avatar-image" />
            </div>
            <div className="profile-menu-item profile-user-info">
              <span className="user-info-name">{user.firstName} {user.lastName}</span>
              <span className="user-info-email">{user.email}</span>
            </div>
          </div>
          <div className="sidebar-content">
            <Link to="/portfolios" onClick={handleClickSidebar}>My Portfolios</Link>
          </div>
          <div className="sidebar-content">
            <span onClick={handleClickSidebarLogout}>Logout</span>
          </div>
        </div>
      ) : null}
      <div className="navbar-avatar-event-wrapper" onMouseEnter={openProfileMenu} onMouseLeave={closeProfileMenu}>
        <div className="navbar-user-avatar-container">
          {/* avatar is going to be implemented at a later version. */}
          <img src={defaultAvatar} alt="user avatar" className="avatar-image" />
          {isProfileMenuOpen ? (
            <div className={`navbar-profile-menu ${theme === 'dark' ? "sidebar--dark-theme" : "sidebar--light-theme"}`}>
              <div className="profile-menu-item profile-user-info">
                <span className="user-info-name">{user.firstName} {user.lastName}</span>
                <span className="user-info-email">{user.email}</span>
              </div>
              <div className="profile-menu-item profile-portfolio">
                <Link to="/portfolios">My Portfolios</Link>
              </div>
              <div className="profile-menu-item profile-logout" onClick={() => logout()}>Logout</div>
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <nav className={`navbar ${theme === 'dark' ? 'navbar--dark-theme' : 'navbar--light-theme'}`}>
      <img src={theme === 'dark' ? mainLogoWhite : mainLogoBlack} alt="main logo" className="main-logo" onClick={handleClickLogo} />
      {isAuthenticated ? navAuth : navGuest}
    </nav>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.auth.theme,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));