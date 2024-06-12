import axios from "../axiosApi";
import { authStore } from "@/pages/stores/authStore";

const baseUrl = "/users";
export const signup = (singUpData) => {
  return axios.post(baseUrl + "/signup", singUpData).then((res) => {
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
        authStore.setIsAdmin(response.data.isAdmin);
        authStore.checkLoggedIn();
      }
      return response;
    });
};

export const logout = () => {
  return axios.post("/logout").then((res) => {
    return res;
  });
};
