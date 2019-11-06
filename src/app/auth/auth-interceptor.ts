import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {CookieService} from 'ngx-cookie-service';



const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.cookieService.get('AuthToken')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.cookieService.get('AuthToken')
        }
      });
    }

    return next.handle(req);
  }
}
