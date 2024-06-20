import instance from "../axiosApi";
import { authStore } from "@/pages/stores/authStore";

const baseUrl = "/users";

// 유저 정보 요청
export const getUserData = async (token) => {
  try {
    let userId = localStorage.getItem("userId");
    console.log(userId);
    const response = await instance.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data;
        //authStore 및 localStorage 업데이트
        authStore.setUserId(userData.userId);
        authStore.setUserName(userData.userName);
        authStore.setNickName(userData.nickName);
        authStore.setProfileUrl(userData.profileUrl);
        authStore.setUserType(userData.userType);
    


    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// 유저 정보 요청
// export const getUserData = async (token) => {
//   try {
//     const response = await instance.get(baseUrl+ '/current', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const userData = response.data;
//     // authStore 및 localStorage 업데이트
//     authStore.setUserId(userData.userId);
//     authStore.setUserName(userData.userName);
//     authStore.setNickName(userData.nickName);
//     authStore.setProfileUrl(userData.profileUrl);
//     authStore.setUserType(userData.userType);

//     return userData;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// };


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
