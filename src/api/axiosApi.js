import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 API의 기본 URL 설정
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.url !== "/reissue") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 로그아웃 함수
const logout = async () => {
  const token = localStorage.getItem("token");

  try {
    await instance.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.clear();
    window.location.href = "/";
  }
};

// 토큰 갱신 함수
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      throw new Error("Refresh token is missing");
    }

    const response = await instance.post("/reissue", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const newAccessToken = response.headers["authorization"];
    const newRefreshToken = response.headers["refresh-token"];

    if (newAccessToken) {
      const pureAccessToken = newAccessToken.split(" ")[1];
      localStorage.setItem("token", pureAccessToken);
    }

    if (newRefreshToken) {
      const pureRefreshToken = newRefreshToken.split(" ")[1];
      localStorage.setItem("refresh", pureRefreshToken);
    }

    return newAccessToken ? newAccessToken.split(" ")[1] : null;
  } catch (error) {
    if (error.response && (error.response.data === "Refresh token expired" || error.response.status === 401)) {
      logout(); // 리프레시 토큰이 만료된 경우 로그아웃 처리
    } else {
      console.error("An error occurred:", error);
    }
    return null;
  }
};

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["authorization"];
    const newRefreshToken = response.headers["refresh-token"];

    if (newAccessToken) {
      const pureAccessToken = newAccessToken.split(" ")[1];
      localStorage.setItem("token", pureAccessToken);
    }

    if (newRefreshToken) {
      const pureRefreshToken = newRefreshToken.split(" ")[1];
      localStorage.setItem("refresh", pureRefreshToken);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } else {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
