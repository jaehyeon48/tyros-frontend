import React from 'react';
import PropTypes from 'prop-types';

import defaultAvatar from '../../images/default_avatar.png';
import './avatarImage.css';

const AvatarImage = ({
  width,
  height
}) => {
  return (
    <div className="avatar-container">
      <img
        src={defaultAvatar}
        alt="user's avatar"
        className="avatar-image"
      />
    </div>
  )
}

AvatarImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default AvatarImage;
