import React from 'react';
import PropTypes from 'prop-types';

import defaultAvatar from '../../images/default_avatar.png';
import './avatarImage.css';

const AvatarImage = ({
  width,
  height
}) => {
  return (
    <div
      className="avatar-container"
      style={{ width: `${width}px`, height: `${height}px` }}>
      <img
        src={defaultAvatar}
        alt="user's avatar"
        className="avatar-image"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  )
}

AvatarImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default AvatarImage;
