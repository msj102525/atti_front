// /api/user/userUpdate.js
import axios from 'axiosApi';

export const uploadProfilePhoto = async (file, userId) => {
  try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const response = await axios.put("/user/uploadProfilePhoto", formData);
      return response.data;
  } catch (error) {
      console.error('업로드 오류:', error);
      throw error;
  }
};

export const deleteProfilePhoto = async (userId) => {
  try {
      const response = await axios.delete(`/user/deleteProfilePhoto/${userId}`);
      return response.data;
  } catch (error) {
      console.error('삭제 오류:', error);
      throw error;
  }
};
