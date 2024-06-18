// userApi.js
import axios from 'axios';

// 유저 정보 수정 
export const updateUser = async (userData) => {
  try {
    const response = await axios.put('/user', userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user information.');
  }
};

// 유저 탈퇴 API
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user.');
  }
};
