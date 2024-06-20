import axios from "../axiosApi";
import { authStore } from "@/pages/stores/authStore";

const baseUrl = "/users";

export const signup = (signUpData) => {
  return axios.post(baseUrl + "/signup", signUpData).then((res) => {
    return res;
  });
};

//로그인시 
export const login = (loginData) => {
  return axios.post("/login", loginData)
    .then((response) => {
      console.log('Login response data:', response.data); // 응답 데이터 확인

      const token = response.headers["authorization"] || response.headers["Authorization"];
      if (token) {
        const pureToken = token.split(" ")[1];
        window.localStorage.setItem("token", pureToken);
        window.localStorage.setItem("isAdmin", response.data.isAdmin);
        window.localStorage.setItem("refresh", response.data.refresh);
        window.localStorage.setItem("userId", response.data.userId);
        window.localStorage.setItem("userName", decodeURIComponent(response.data.userName));
        window.localStorage.setItem("nickName", response.data.nickName);
        window.localStorage.setItem("email", response.data.email);
        window.localStorage.setItem("profileUrl", response.data.profileUrl);
        window.localStorage.setItem("userType", response.data.userType || 'U');
        window.localStorage.setItem("birthDate", response.data.birthDate);
        window.localStorage.setItem("phone", response.data.phone);
        window.localStorage.setItem("loginType", response.data.loginType || 'regular');

        // authStore에 사용자 정보를 설정
        authStore.setLoggedIn(true);
        authStore.setUserId(response.data.userId);
        authStore.setUserName(decodeURIComponent(response.data.userName));
        authStore.setNickName(response.data.nickName);
        authStore.setProfileUrl(response.data.profileUrl);
        authStore.setEmail(response.data.email);
        authStore.setGender(response.data.gender);
        authStore.setUserType(response.data.userType || 'U');
        authStore.setBirthDate(response.data.birthDate);
        authStore.setPhone(response.data.phone);
        authStore.setLoginType(response.data.loginType || 'regular');

        if (response.data.birthDate) {
          authStore.setBirthDate(response.data.birthDate);
        }
      }
      return response;
    })
    .catch(error => {
      console.error('Login error:', error);
      throw error;
    });
};


const logoutCommon = (url) => {
  const token = localStorage.getItem('token');
  return axios.post(url, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => {
    window.localStorage.clear();
    return res;
  });
};

export const logout = () => logoutCommon("/logout");
export const logoutSocial = () => logoutCommon("/logoutSocial");
export const logoutKakao = () => logoutCommon("/kakao/logout");
export const logoutNaver = () => logoutCommon("/naver/logout");
