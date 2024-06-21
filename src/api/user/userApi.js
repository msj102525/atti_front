import axios from 'axios';
import instance from '../axiosApi';
const baseUrl = "/users";

// 유저 정보 수정
export async function updateUser(userData) {
  try {
    const response = await instance.put(baseUrl + '/update', userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user information:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Failed to update user information.');
  }
}

// 유저 삭제
export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`${baseUrl}/deleteUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 204) {
      // Clear the local storage
      localStorage.clear();
      console.log("User deleted and local storage cleared.");
    }

    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Failed to delete user.');
  }
}

// 사용자 데이터 가져오기
export const getUserData = async (token) => {
  try {
    const response = await instance.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw new Error('Failed to fetch user data.');
  }
};
