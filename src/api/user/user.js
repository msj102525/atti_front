import axios from "../axiosApi"; // axios 인스턴스를 사용
import { authStore } from "@/pages/stores/authStore";

const baseUrl = "/users";

export const signup = (signUpData) => {
  return axios.post(baseUrl + "/signup", signUpData).then((res) => {
    return res;
  });
};

export const login = (loginData) => {
  return axios.post("/login", loginData)
    .then((response) => {
      const token = response.headers["authorization"] || response.headers["Authorization"];
      if (token) {
        const pureToken = token.split(" ")[1];
        window.localStorage.setItem("token", pureToken);
        window.localStorage.setItem("isAdmin", response.data.isAdmin);
        window.localStorage.setItem("refresh", response.data.refresh);
        window.localStorage.setItem("userId", response.data.userId || '');
        window.localStorage.setItem("userName", response.data.userName || '');
        window.localStorage.setItem("nickName", response.data.nickName || '');
        window.localStorage.setItem("profileUrl", response.data.profileUrl || '');
        window.localStorage.setItem("userType", response.data.userType || 'U');
        // window.localStorage.setItem("gender", response.data.gender || '');

        authStore.setIsAdmin(response.data.isAdmin);
        authStore.checkLoggedIn();
        authStore.setUserId(response.data.userId || '');
        authStore.setUserName(response.data.userName || '');
        authStore.setNickName(response.data.nickName || '');
        authStore.setProfileUrl(response.data.profileUrl || '');
        // authStore.setGender(response.data.gender || '');
        authStore.setUserType(response.data.userType || 'U');
      }
      return response
    });
};

export const logout = () => {
  const token = localStorage.getItem('token');
  return axios.post("/logout", {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isAdmin");
    window.localStorage.removeItem("refresh");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("nickName");
    window.localStorage.removeItem("profileUrl");
    window.localStorage.removeItem("userType");
    window.localStorage.removeItem("gender");
    return res;
  });
};


export const logoutSocial = () => {
  const token = localStorage.getItem('token');
  return axios.post("/logoutSocial", {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isAdmin");
    window.localStorage.removeItem("refresh");
    return res;
  });
};
export const logoutkakao = () => {
  const token = localStorage.getItem('token');
  return axios.post("/kakao/logout", {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isAdmin");
    window.localStorage.removeItem("refresh");
    return res;
  });
};

export const logoutNaver = () => {
  const token = localStorage.getItem('token');
  return axios.post("/naver/logout", {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isAdmin");
    window.localStorage.removeItem("refresh");
    return res;
  });
};
