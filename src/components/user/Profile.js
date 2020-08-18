import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarImage from '../avatar/AvatarImage';
import Modal from '../modal/Modal';
import UploadAvatar from '../avatar/UploadAvatar';
import './profile.css';

const Profile = ({
  loading,
  isAuthenticated
}) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  if (!isAuthenticated && !loading) {
    return <Redirect to="/login" />
  }

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  }

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  }

  return (
    <React.Fragment>
      <div className="profile-container">
        <div className="profile-side">
          <div className="profile-avatar-container">
            <AvatarImage />
          </div>
          <button className="btn btn-edit-avatar" onClick={openAvatarModal}>EDIT AVATAR</button>
        </div>

        <div className="profile-user-info">

        </div>
      </div>
      {isAvatarModalOpen && (
        <Modal closeModalFunc={closeAvatarModal}>
          <div className="title-edit-avatar-modal">EDIT YOUR AVATAR!</div>
          <UploadAvatar />
        </Modal>
      )}
    </React.Fragment>
  )
}

Profile.propTypes = {
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Profile);
