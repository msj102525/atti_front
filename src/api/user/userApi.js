import instance from "../axiosApi";

const baseUrl = "/users";

// 유저 정보 수정
export async function updateUser(userData) {
  try {
      const response = await instance.put(baseUrl + '/update', userData, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰을 로컬스토리지에서 가져오기
          },
      });
      return response.data;
  } catch (error) {
      console.error('Failed to update user information:', error);
      if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
      } else if (error.request) {
          // 요청이 이루어졌으나 응답을 받지 못한 경우
          console.error('Request data:', error.request);
      } else {
          // 요청 설정 중에 오류가 발생한 경우
          console.error('Error message:', error.message);
      }
      throw new Error('Failed to update user information.');
  }
}

// 유저 탈퇴
export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`${baseUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰을 로컬스토리지에서 가져오기
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error);
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error('Request data:', error.request);
    } else {
      // 요청 설정 중에 오류가 발생한 경우
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
