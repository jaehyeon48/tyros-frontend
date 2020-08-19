import axios from 'axios';

import {
  UPLOAD_AVATAR,
  AVATAR_ERROR
} from './actionTypes';

import SERVER_URL from './serverURL';

export const uploadAvatar = (avatarImage) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  };
  try {
    const avatarFile = new FormData();
    avatarFile.append('avatar', avatarImage);

    const uploadResponse = await axios.post(`${SERVER_URL}/api/user/avatar`, avatarFile, config);
    /* wait for 1s to retrieve image */
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch({
      type: UPLOAD_AVATAR,
      payload: uploadResponse.data.avatar
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: AVATAR_ERROR });
  }
}