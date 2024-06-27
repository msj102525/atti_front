import { makeAutoObservable } from "mobx";

class AuthStore {
  loggedIn = false;
  socialLoggedIn = false;
  isAdmin = false;
  logoutkakao = false;
  logoutnaver = false;
  userId = '';
  userName = '';
  email = '';
  nickName = '';
  profileUrl = '';
  userType = '';
  gender = '';
  birthDate = '';
  phone = '';
  loginType = 'regular'; // 일반 유저일 때는 regular, 소셜은 각 이름들로 보임
  password = '';
  confirmPassword = '';

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== "undefined") {
      this.loadFromLocalStorage();
    }
  }

  isJSON(value) {
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  }

  loadFromLocalStorage() {
    const keys = [
      "loggedIn", "socialLoggedIn", "isAdmin", "logoutkakao", "logoutnaver",
      "userId", "userName", "email", "nickName", "profileUrl", "userType",
      "gender", "birthDate", "phone", "loginType", "password"
    ];
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        this[key] = this.isJSON(value) ? JSON.parse(value) : value;
      }
    });
  }

  setLoggedIn(status) {
    this.loggedIn = status;
    localStorage.setItem("loggedIn", JSON.stringify(status));

    if (!status) {
      this.clearLocalStorage();
    }
  }

  setSocialLoggedIn(status) {
    this.socialLoggedIn = status;
    localStorage.setItem("socialLoggedIn", JSON.stringify(status));
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

  setLogoutKakao(status) {
    this.logoutkakao = status;
    localStorage.setItem("logoutkakao", JSON.stringify(status));
  }

  setLogoutNaver(status) {
    this.logoutnaver = status;
    localStorage.setItem("logoutnaver", JSON.stringify(status));
  }

  setUserId(userId) {
    this.userId = userId;
    localStorage.setItem("userId", userId);
  }

  setUserName(userName) {
    this.userName = userName;
    localStorage.setItem("userName", userName);
  }

  setEmail(email) {
    this.email = email;
    localStorage.setItem("email", email);
  }

  setNickName(nickName) {
    this.nickName = nickName;
    localStorage.setItem("nickName", nickName);
  }

  setProfileUrl(profileUrl) {
    this.profileUrl = profileUrl;
    localStorage.setItem("profileUrl", profileUrl);
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

  setGender(type) {
    const validTypes = ['F', 'M'];
    if (validTypes.includes(type)) {
      this.gender = type;
      localStorage.setItem("gender", type);
    } else {
      this.gender = ''; // 기본값 설정
      localStorage.removeItem("gender");
    }
  }

  setBirthDate(date) {
    let formattedDate = '';
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
    } else if (typeof date === 'string' && date.includes('T')) {
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
    } else if (typeof date === 'string') {
      formattedDate = date;
    } else {
      throw new Error("Invalid date input. The date must be a Date object or a valid date string.");
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (datePattern.test(formattedDate)) {
      this.birthDate = formattedDate;
      localStorage.setItem("birthDate", formattedDate);
    } else {
      throw new Error("Invalid date format. The date must be in YYYY-MM-DD format.");
    }
  }

  setPhone(phone) {
    this.phone = phone;
    localStorage.setItem("phone", phone);
  }

  setLoginType(type) {
    this.loginType = type || 'regular';
    localStorage.setItem("loginType", this.loginType);
  }

  setPassword(password) {
    this.password = password;
    localStorage.setItem("password", password);
  }

  setConfirmPassword(confirmPassword) {
    this.confirmPassword = confirmPassword;
  }

  clearLocalStorage() {
    const keys = [
      "loggedIn", "socialLoggedIn", "isAdmin", "logoutkakao", "logoutnaver",
      "userId", "userName", "email", "nickName", "profileUrl", "userType",
      "gender", "birthDate", "phone", "loginType", "password", "confirmPassword"
    ];
    keys.forEach((key) => localStorage.removeItem(key));
    this.loadFromLocalStorage();
  }
}

export const authStore = new AuthStore();
