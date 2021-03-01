import { Injectable } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import { HttpHeaders } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/user.service';

const SEP_KEY = "SEP.KEY";
const ACCESS_TOKEN = "SEP.ACCESS_TOKEN";
const USER_ROLE = "SEP.USER_ROLES";
const USER_EMAIL = 'SEP.USER_EMAIL';
const USER_ID = 'SEP.USER_ID';
const USER_NAME = 'SEP.USER_NAME';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: string;
  username: string;
  loginResponse: LoginResponse;

  encryptSecretKey = 'pulseKey';

  constructor(public dataSharingService: DataSharingService,private readonly router:Router) {
  }

  checkSessionActive() {
  
    const sessionKeyEncrypt = localStorage.getItem(SEP_KEY);
    const userAccessTokenEncrypt = localStorage.getItem(ACCESS_TOKEN);
    const userNameEncrypt = localStorage.getItem(USER_NAME);
    const userRoleEncrypt = localStorage.getItem(USER_ROLE);
    const userEmailNameEncrypt = localStorage.getItem(USER_EMAIL);
    const userIdEncrypt = localStorage.getItem(USER_ID);

    if (sessionKeyEncrypt === null || userAccessTokenEncrypt === null) {
      return false;
    }

    const sessionKeyDecrypt = this.decryptData(sessionKeyEncrypt);
    const userAccessTokenDecrypt = this.decryptData(userAccessTokenEncrypt);
    const userNameDecrypt = this.decryptData(userNameEncrypt);
    const userRolesDecrypt = this.decryptData(userRoleEncrypt);
    const userEmailDecrypt = this.decryptData(userEmailNameEncrypt);
    const userIdDecrypt = this.decryptData(userIdEncrypt);

    const sessionKey = `${userNameDecrypt}${this.getTodaysDate()}`;

    this.loginResponse = new LoginResponse();
    this.loginResponse.id = userIdDecrypt;
    this.loginResponse.username = userNameDecrypt;
    this.loginResponse.email = userEmailDecrypt;
    this.loginResponse.roles = userRolesDecrypt;
    this.loginResponse.accessToken = userAccessTokenDecrypt;
    this.loginResponse.tokenType = 'Bearer';

    this.dataSharingService.loginResponse = this.loginResponse;


    if (sessionKey === sessionKeyDecrypt) {
      return true;
    } else {
      return false;
    }
  }

  setSession(loginResponse: LoginResponse) {

    const temp = `${loginResponse.username}${this.getTodaysDate()}`;

    const sessionKeyEncrypt = this.encryptData(temp);
    const userAccessTokenEncrypt = this.encryptData(loginResponse.accessToken);
    const userNameEncrypt = this.encryptData(loginResponse.username);
    const userRoleEncrypt = this.encryptData(loginResponse.roles);
    const userEmailNameEncrypt = this.encryptData(loginResponse.email);
    const userIdEncrypt = this.encryptData(loginResponse.id);

    localStorage.setItem(SEP_KEY, sessionKeyEncrypt);
    localStorage.setItem(ACCESS_TOKEN, userAccessTokenEncrypt);
    localStorage.setItem(USER_NAME, userNameEncrypt);
    localStorage.setItem(USER_ROLE, userRoleEncrypt);
    localStorage.setItem(USER_EMAIL, userEmailNameEncrypt);
    localStorage.setItem(USER_ID, userIdEncrypt);

  }

  clearSession() {
    localStorage.clear();
  }

  getTodaysDate() {
    const currentDate = new Date();
    var newDate = new Date();
    newDate.setDate(currentDate.getDate() - 1);
    const splittedDate = {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      date: newDate.getDate(),
      hour: 23,
      minute: 59
    };
    return moment().set(splittedDate).format('YYYY-MM-DD');
  }

  encryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  decryptData(data: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}