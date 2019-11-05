import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USER_ID = 'UserId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor(private cookieService: CookieService) { }

  signOut() {
    this.cookieService.deleteAll();
    window.location.reload();
  }

  public saveToken(token: string) {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY, token, 7);
  }

  public getToken(): string {
    return this.cookieService.get(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    this.cookieService.delete(USERNAME_KEY);
    this.cookieService.set(USERNAME_KEY, username, 7);
  }

  public saveUserId(userId: number) {
    this.cookieService.set(USER_ID, userId.toString(), 7);
  }

  public getUsername(): string {
    return this.cookieService.get(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    this.cookieService.delete(AUTHORITIES_KEY);
    this.cookieService.set(AUTHORITIES_KEY, JSON.stringify(authorities), 7);
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
}

