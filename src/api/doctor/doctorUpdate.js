import axios from "axios";

//----------------------------------------------------------------
//이미지 파일 전송을 위한 별도의 객체 생성
// 파일 업로드 전용 Axios 인스턴스 생성
const fileUploadInstance = axios.create({
  baseURL: "http://localhost:8080", // 서버의 기본 URL
  headers: {
    // Content-Type 설정하지 않음, 브라우저가 자동으로 multipart/form-data로 설정
  },
});
// 요청 인터셉터 추가 (선택 사항)
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

// 응답 인터셉터 추가 (선택 사항)
fileUploadInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리 로직
    return Promise.reject(error);
  }
);

export const updateDoctorProfile = (formData) => {
  return fileUploadInstance.put("/doctor/mypage", formData).then((res) => res);
};


// export const uploadProfilePhoto = (file, userId) =>{
//   return fileUploadInstance.put("/file/upload", file, userId).then((res) => res);
// }



export const uploadProfilePhoto = async (file, userId) => {
  try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      return fileUploadInstance.put("/file/upload", formData).then((res) => res);
  } catch (error) {
      console.error('업로드 오류:', error);
      throw error;
  }
};

//-----------------------------------------------------------------
