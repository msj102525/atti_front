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
  loginType = 'regular';  //일반 유저일때는 regular ,소셜은 각 이름들로 보임
  password = '';
  confirmPassword = '';

  constructor() {
    makeAutoObservable(this);

    // 클라이언트 사이드에서만 LocalStorage에서 상태를 초기화
    if (typeof window !== "undefined") {
      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || false;
      this.socialLoggedIn = JSON.parse(localStorage.getItem("socialLoggedIn")) || false;
      this.isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false;
      this.logoutkakao = JSON.parse(localStorage.getItem("logoutkakao")) || false;
      this.logoutnaver = JSON.parse(localStorage.getItem("logoutnaver")) || false;
      this.userId = localStorage.getItem("userId") || '';
      this.userName = localStorage.getItem("userName") || '';
      this.email = localStorage.getItem("email") || '';
      this.nickName = localStorage.getItem("nickName") || '';
      this.profileUrl = localStorage.getItem("profileUrl") || '';
      this.userType = localStorage.getItem("userType") || '';
      this.gender = localStorage.getItem("gender") || '';
      this.birthDate = localStorage.getItem("birthDate") || '';
      this.phone = localStorage.getItem("phone") || '';
      this.loginType = localStorage.getItem("loginType") || 'regular';
      this.password = localStorage.getItem("password") || '';
      this.confirmPassword = '';
    }
  }

  setLoggedIn(status) {
    this.loggedIn = status;
    localStorage.setItem("loggedIn", JSON.stringify(status));

    if (!status) {
      this.socialLoggedIn = false;
      this.isAdmin = false;
      this.logoutkakao = false;
      this.logoutnaver = false;
      this.userId = '';
      this.userName = '';
      this.email = '';
      this.nickName = '';
      this.profileUrl = '';
      this.userType = '';
      this.gender = '';
      this.birthDate = '';
      this.phone = '';
      this.loginType = 'regular';
      this.password = '';
      this.confirmPassword = '';
      localStorage.removeItem("socialLoggedIn");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("logoutkakao");
      localStorage.removeItem("logoutnaver");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      localStorage.removeItem("nickName");
      localStorage.removeItem("profileUrl");
      localStorage.removeItem("userType");
      localStorage.removeItem("gender");
      localStorage.removeItem("birthDate");
      localStorage.removeItem("phone");
      localStorage.removeItem("loginType");
      localStorage.removeItem("password");
      localStorage.removeItem("confirmPassword");
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

  // setBirthDate(date) {
  //   let formattedDate;
  //   console.log(formattedDate,'12313138484');
  //   if (date instanceof Date) {
  //     // Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 맞춤
  //     const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 맞춤
  //     formattedDate = `${year}-${month}-${day}`;
  //   } else if (typeof date === 'string' && date.includes('T')) {
  //     // ISO 8601 형식의 문자열을 Date 객체로 변환
  //     const parsedDate = new Date(date);
  //     const year = parsedDate.getFullYear();
  //     const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 맞춤
  //     const day = String(parsedDate.getDate()).padStart(2, '0'); // 일을 두 자리로 맞춤
  //     formattedDate = `${year}-${month}-${day}`;
  //   } else if (typeof date === 'string') {
  //     // 이미 YYYY-MM-DD 형식의 문자열일 경우
  //     formattedDate = date;
  //   } else {
  //     throw new Error("Invalid date input. The date must be a Date object or a valid date string.");
  //   } 
  //   // 변환 후 날짜 형식 검증 (예: YYYY-MM-DD)
  //   const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  //   if (datePattern.test(formattedDate)) {
  //     this.birthDate = formattedDate;
  //     localStorage.setItem("birthDate", formattedDate);
  //     console.log(formattedDate,'sdfsdffwefwe');
  //   } else {
  //     throw new Error("Invalid date format. The date must be in YYYY-MM-DD format.");
  //   }
  // }
  setBirthDate(date) {
    let formattedDate = '';
    console.log(formattedDate);
    if (date instanceof Date) {
      // Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 맞춤
      const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 맞춤
      formattedDate = `${year}-${month}-${day}`;
    } else if (typeof date === 'string' && date.includes('T')) {
      // ISO 8601 형식의 문자열을 Date 객체로 변환
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 맞춤
      const day = String(parsedDate.getDate()).padStart(2, '0'); // 일을 두 자리로 맞춤
      formattedDate = `${year}-${month}-${day}`;
    } else if (typeof date === 'string') {
      // 이미 YYYY-MM-DD 형식의 문자열일 경우
      formattedDate = date;
    } else {
      throw new Error("Invalid date input. The date must be a Date object or a valid date string.");
    }

    // 변환 후 날짜 형식 검증 (예: YYYY-MM-DD)
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
}

export const authStore = new AuthStore();
