import { makeAutoObservable } from "mobx";

class AuthStore {
  loggedIn = false;
  isAdmin = false;
  logoutkakao = false;
  userId = '';
  userName = '';
  nickName = '';
  profileUrl = '';
  userType = '';

  constructor() {
    makeAutoObservable(this);

    // 클라이언트 사이드에서만 LocalStorage에서 상태를 초기화
    if (typeof window !== "undefined") {
      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || false;
      this.isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false;
      this.logoutkakao = JSON.parse(localStorage.getItem("logoutkakao")) || false;
      this.userId = localStorage.getItem("userId") || '';
      this.userName = localStorage.getItem("userName") || '';
      this.nickName = localStorage.getItem("nickName") || '';
      this.profileUrl = localStorage.getItem("profileUrl") || '';
      this.userType = localStorage.getItem("userType") || '';
    }
  }

  setLoggedIn(status) {
    this.loggedIn = status;
    localStorage.setItem("loggedIn", JSON.stringify(status));
  }

  checkLoggedIn() {
    if (typeof window !== "undefined") {
      this.loggedIn = !!localStorage.getItem("token");
    }
  }

  setIsAdmin(status) {
    this.isAdmin = status;
    localStorage.setItem("isAdmin", JSON.stringify(status));
  }

  setSocialLoggedIn(status) {
    this.logoutkakao = status;
    localStorage.setItem("logoutkakao", JSON.stringify(status));
  }

  setUserId(userId) {
    this.userId = userId;
    localStorage.setItem("userId", userId);
  }

  setUserName(userName) {
    this.userName = userName;
    localStorage.setItem("userName", userName);
  }

  setNickName(nickname) {
    this.nickName = nickname;
    localStorage.setItem("nickName", nickname);
  }

  setProfileUrl(url) {
    this.profileUrl = url;
    localStorage.setItem("profileUrl", url);
  }

  setUserType(type) {
    const validTypes = ['U', 'A', 'D'];
    if (validTypes.includes(type)) {
      this.userType = type;
      localStorage.setItem("userType", type);
    } else {
      throw new Error(`Invalid userType: ${type}. Valid values are 'U', 'A', 'D'.`);
    }
  }
}

export const authStore = new AuthStore();
