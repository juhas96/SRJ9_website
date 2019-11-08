import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {CookieService} from 'ngx-cookie-service';

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
  constructor(private router: Router,
              private notificationService: NotificationService,
              private cookieService: CookieService) { }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
    this.notificationService.createNotification('success', 'Log Out', 'Your log out was successfull');
  }

  public saveToken(token: string) {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY, token);
  }

  public getToken(): string {
    return this.cookieService.get(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    this.cookieService.delete(USERNAME_KEY);
    this.cookieService.set(USERNAME_KEY, username);
  }

  public saveUserId(userId: number) {
    this.cookieService.set(USER_ID, userId.toString());
  }

  public getUsername(): string {
    return this.cookieService.get(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    this.cookieService.delete(AUTHORITIES_KEY);
    this.cookieService.set(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (this.cookieService.get(TOKEN_KEY)) {
      JSON.parse(this.cookieService.get(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public getParsedAuthorities() {
    if (this.getToken() && this.getUsername() !== '') {
      this.getAuthorities().forEach(role => {
        if ( role === 'ROLE_ADMIN') {
          this.authorities = 'admin';
        } else {
          this.authorities = 'user';
        }
      });
    }
  }
}

