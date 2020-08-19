import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarImage from '../avatar/AvatarImage';
import Modal from '../modal/Modal';
import UploadAvatar from '../avatar/UploadAvatar';
import './profile.css';
import { updateProfile } from '../../actions/userAction';

const Profile = ({
  loading,
  isAuthenticated,
  user,
  updateProfile
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  if (!isAuthenticated && !loading) {
    return <Redirect to="/login" />
  }

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  }

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleCurrentPWChange = (e) => {
    setCurrentPassword(e.target.value);
  }

  const handleNewPWChange = (e) => {
    setNewPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateProfileResult = await updateProfile({ firstName, lastName, currentPassword, newPassword });

    if (updateProfileResult === 0) {
      window.location.reload();
    }
    else if (updateProfileResult === -1) {
      alert('Update profile error');
    }
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
          <form className="profile-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              className="profile-form-field"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="firstName"
              value={lastName}
              onChange={handleLastNameChange}
              className="profile-form-field"
            />
            <input
              type="password"
              placeholder="Current Password (optional)"
              name="currentPassword"
              value={currentPassword}
              onChange={handleCurrentPWChange}
              className="profile-form-field"
            />
            <input
              type="password"
              placeholder="New Password (optional)"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPWChange}
              className="profile-form-field"
            />
            <button type="submit" className="btn btn-edit-profile">EDIT PROFILE</button>
          </form>
        </div>
      </div>
      {isAvatarModalOpen && (
        <Modal closeModalFunc={closeAvatarModal}>
          <div className="title-edit-avatar-modal">EDIT YOUR AVATAR!</div>
          <UploadAvatar closeModalFunc={closeAvatarModal} />
        </Modal>
      )}
    </React.Fragment>
  )
}

Profile.propTypes = {
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  updateProfile: PropTypes.func
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { updateProfile })(Profile);
