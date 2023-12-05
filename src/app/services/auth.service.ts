import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface loginType {
  email?: string;
  password?: string;
}

export interface signUpType {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  username?: string;
  role?: ['admin', 'user'];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:4000/authenticate';

  constructor(private http: HttpClient) {}

  onLogin(loginData: loginType) {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  onSignUp(signUpData: signUpType) {
    console.log('success');
    return this.http.post(`${this.baseUrl}/signUp`, signUpData);
  }

  onGetAllUsers(){
    return this.http.get(`${this.baseUrl}/getAllUser`)
  }
}