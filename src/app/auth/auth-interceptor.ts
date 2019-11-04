import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';



const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('AuthToken')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('AuthToken')
        }
      });
    }

    return next.handle(req);
  }
}
