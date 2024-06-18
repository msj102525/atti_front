import { makeAutoObservable, autorun } from "mobx";

class AuthStore {
  loggedIn = false;
  isAdmin = false;
  logoutkakao = false;
  userId = false;
  userName = '';
  nickName = '';
  profileUrl = '';
  userType = '';
  gender = '';

  constructor() {
    makeAutoObservable(this);

    // 클라이언트 사이드에서만 LocalStorage에서 상태를 초기화
    if (typeof window !== "undefined") {
      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || false;
      this.isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false;
      this.logoutkakao = JSON.parse(localStorage.getItem("logoutkakao")) || false;
      this.userId = localStorage.getItem("userId") || false;
      this.userName = localStorage.getItem("userName") || '';
      this.nickName = localStorage.getItem("nickName") || '';
      this.profileUrl = localStorage.getItem("profileUrl") || '';
      this.userType = localStorage.getItem("userType") || '';
      // this.gender = localStorage.getItem("gender") || '';
    }

  }

  setLoggedIn(status) {
    this.loggedIn = status;
  }

  checkLoggedIn() {
    if (typeof window !== "undefined") {
      this.loggedIn = !!localStorage.getItem("token");
    }
  }

  setIsAdmin(status) {
    this.isAdmin = status;
  }

  setSocialLoggedIn(status) {
    this.logoutkakao = status;
  }

  setUserId(id) {
    this.userId = id;
  }

  setUserName(name) {
    this.userName = name;
  }

  setNickName(nickname) {
    this.nickName = nickname;
  }

  setProfileUrl(url) {
    this.profileUrl = url;
  }

  setUserType(type) {
    const validTypes = ['U', 'A', 'D'];
    if (validTypes.includes(type)) {
      this.userType = type;
    } else {
      throw new Error(`Invalid userType: ${type}. Valid values are 'U', 'A', 'D'.`);
    }
  }

  setGender(type) {
    const validGenders = ['F', 'M'];
    if (validGenders.includes(type)) {
      this.gender = type;
    } else {
      throw new Error(`Invalid gender: ${type}. Valid values are 'F', 'M'.`);
    }
  }
}

export const authStore = new AuthStore();
