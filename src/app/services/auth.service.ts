import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(loginData: loginType) {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  onSignUp(signUpData: signUpType) {
    return this.http.post(`${this.baseUrl}/signUp`, signUpData);
  }

  onGetAllUsers(query: string = '', page = '') {
    return this.http.get(`${this.baseUrl}/getAllUser${query}${page}`);
  }

  onAddUser(userData: signUpType) {
    return this.http.post(`${this.baseUrl}/createUser`, userData);
  }

  onGetOneUser(id: string) {
    return this.http.get(`${this.baseUrl}/getOneUser/${id}`);
  }

  onUpdateUser(id: string, updateData: signUpType) {
    return this.http.patch(`${this.baseUrl}/updateUser/${id}`, updateData);
  }

  onDeleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }

  getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  setItemInLocalStorage(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.next(true);
  }

  checkTokenAvailability() {
    const token = localStorage.getItem('token');
    if (token) this.isLoggedIn.next(true);
  }

  signOutUser() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigateByUrl('/login');
    // location.reload();
  }
}
