import axios from 'axios';

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
  } catch (error) {
    console.error(error);
  }
}