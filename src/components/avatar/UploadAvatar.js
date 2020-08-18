import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './uploadAvatar.css';

const UploadAvatar = props => {
  const [avatarImage, setAvatarImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!avatarImage) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(avatarImage);
  }, [avatarImage]);

  const handlePickedImage = (e) => {
    let pickedImage;
    if (e.target.files && e.target.files.length === 1) {
      pickedImage = e.target.files[0];
      setAvatarImage(pickedImage);
      setIsValid(true);
    }
    else {
      setIsValid(false);
    }
  }

  const handlePickingImage = () => {
    filePickerRef.current.click();
  }

  return (
    <div>
      <input
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={handlePickedImage}
      />
      <div className="image-upload">
        <div className="image-upload-preview" onClick={handlePickingImage}>
          {previewUrl ? <img src={previewUrl} alt="avatar preview" /> : <p>Click here to choose an image.</p>}
        </div>
        <button className="btn btn-upload-avatar" disabled={!isValid}>EDIT AVATAR</button>
      </div>
    </div>
  )
}

UploadAvatar.propTypes = {

}

export default UploadAvatar;
