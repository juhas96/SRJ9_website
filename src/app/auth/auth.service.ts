import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {SignupInfo} from './signup-info';
import {TokenStorageService} from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  private roles;

  private loginUrl = 'http://147.232.191.144:8087/api/auth/signin';
  private signupUrl = 'http://147.232.191.144:8087/api/auth/signup';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('AuthUsername');
    return !(user === null);
  }

  getUserAuthority() {
    return sessionStorage.getItem('AuthAuthorities') === '[{"authority":"ROLE_ADMIN"}]';
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
