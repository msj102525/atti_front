import { makeAutoObservable } from "mobx";

class AuthStore {
  loggedIn = false;
  isAdmin = false;
  socialLoggedIn = false;
  constructor() {
    makeAutoObservable(this);
  }

  setLoggedIn(status) {
    this.loggedIn = status;
  }

  checkLoggedIn() {
    this.loggedIn = !!localStorage.getItem("token");
    
  }

  setIsAdmin(status) {
    this.isAdmin = status;
  }
  setsocialLoggedIn(status){
    socialLoggedIn = status;
  }
}

export const authStore = new AuthStore();
