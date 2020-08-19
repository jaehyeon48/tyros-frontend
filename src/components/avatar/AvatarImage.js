import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import defaultAvatar from '../../images/default_avatar.png';
import './avatarImage.css';
import SERVER_URL from '../../actions/serverURL';

const AvatarImage = ({
  user
}) => {
  return (
    <div className="avatar-container">
      <img
        src={user && user.avatar ? `${SERVER_URL}/avatars/${user.avatar}` : defaultAvatar}
        alt="user's avatar"
        className="avatar-image"
      />
    </div>
  )
}

AvatarImage.propTypes = {
  avatar: PropTypes.string
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AvatarImage);
