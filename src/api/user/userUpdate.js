// /api/user/userUpdate.js
import axios from 'axios';

// 파일 업로드 전용 Axios 인스턴스 생성
const fileUploadInstance = axios.create({
  baseURL: "http://localhost:8080", // 서버의 기본 URL
  headers: {
    // Content-Type 설정하지 않음, 브라우저가 자동으로 multipart/form-data로 설정
  },
});

// 요청 인터셉터 추가
fileUploadInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가
fileUploadInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const uploadProfilePhoto = async (file, userId) => {
  try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const response = await fileUploadInstance.put("/user/uploadProfilePhoto", formData);
      return response.data;
  } catch (error) {
      console.error('업로드 오류:', error);
      throw error;
  }
};

export const deleteProfilePhoto = async (userId) => {
  try {
      const response = await fileUploadInstance.delete(`/user/deleteProfilePhoto/${userId}`);
      return response.data;
  } catch (error) {
      console.error('삭제 오류:', error);
      throw error;
  }
};
