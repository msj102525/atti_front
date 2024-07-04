import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://43.202.66.137:8080",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

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

const handleLogoutWithToast = () => {
  toast.error("세션이 만료되었습니다. 다시 로그인 해주세요.", {
    onClose: () => {
      localStorage.clear();
      window.location.href = "/login";
    },
  });
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      throw new Error("Refresh token is missing");
    }

    const response = await instance.request({
      method: "post",
      url: "/reissue",
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
    if (error.response && (error.response.data === "Both tokens expired, please log in again." || error.response.status === 401)) {
      handleLogoutWithToast(); // 알림 띄우기
    } else {
      console.error("An error occurred:", error);
    }
    return null;
  }
};

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
        handleLogoutWithToast(); // 알림 띄우기
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
