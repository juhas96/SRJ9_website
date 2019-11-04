import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USER_ID = 'UserId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  authorities: string;
  constructor(private router: Router, private notificationService: NotificationService) { }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigate(['/']);
    this.notificationService.createNotification('success', 'Log Out', 'Your log out was successfull');
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public saveUserId(userId: number) {
    window.sessionStorage.setItem(USER_ID, userId.toString());
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public getParsedAuthorities() {
    if (this.getToken() && this.getUsername() !== '') {
      this.getAuthorities().forEach(role => {
        console.log(role);
        if ( role === 'ROLE_ADMIN') {
          this.authorities = 'admin';
        } else {
          this.authorities = 'user';
        }
      });
    }
  }
}

