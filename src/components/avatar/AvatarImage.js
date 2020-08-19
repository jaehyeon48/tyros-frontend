import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import defaultAvatar from '../../images/default_avatar.png';
import './avatarImage.css';
import SERVER_URL from '../../actions/serverURL';

const AvatarImage = ({
  width,
  height,
  avatar
}) => {
  return (
    <div className="avatar-container">
      <img
        src={avatar ? `${SERVER_URL}/avatars/${avatar}` : defaultAvatar}
        alt="user's avatar"
        className="avatar-image"
      />
    </div>
  )
}

AvatarImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  avatar: PropTypes.string
}

const mapStateToProps = (state) => ({
  avatar: state.auth.user.avatar
});

export default connect(mapStateToProps)(AvatarImage);
