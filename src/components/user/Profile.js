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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: ''
  });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const { firstName, lastName, currentPassword, newPassword } = formData;

  if (!isAuthenticated && !loading) {
    return <Redirect to="/login" />
  }

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  }

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  }

  const handleChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
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
          <form className="profile-form">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="profile-form-field"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="firstName"
              value={lastName}
              onChange={handleChange}
              className="profile-form-field"
            />
            <input
              type="password"
              placeholder="Current Password (optional)"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              className="profile-form-field"
            />
            <input
              type="password"
              placeholder="New Password (optional)"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              className="profile-form-field"
            />
            <button type="submit" className="btn btn-edit-profile">EDIT PROFILE</button>
          </form>
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
