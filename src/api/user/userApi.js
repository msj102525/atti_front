import instance from "../axiosApi";

const baseUrl = "/users";

// 유저 정보 수정 
export const updateUser = async (userData) => {
  try {
    const response = await instance.put(baseUrl +'/update' , userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user information:', error);
    throw new Error('Failed to update user information.');
  }
};

// 유저 탈퇴 
export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(baseUrl+ {userId}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw new Error('Failed to delete user.');
  }
};
