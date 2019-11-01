import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ApiParams} from '../interfaces/ApiParams';
import {catchError, retry} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // constructor(private http: HttpClient) { }
  //
  // readonly ROOT_URL = 'http://147.232.191.144:8087/api';
  //
  // private static handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get cliend-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(errorMessage);
  // }
  //
  // public post(params: ApiParams, body): Observable<any> {
  //   return this.http.post(
  //     this.ROOT_URL + '' + params.endp,
  //     JSON.stringify(body),
  //     httpOptions
  //   ).pipe(
  //     retry(1),
  //     catchError(ApiService.handleError)
  //   );
  // }
  //
  // public get(params: ApiParams): Observable<any> {
  //   return this.http.get(
  //     this.ROOT_URL + '' + params.endp, httpOptions
  //   ).pipe(
  //     retry(1),
  //     catchError(ApiService.handleError)
  //   );
  // }
  //
  // public delete(params: ApiParams): Observable<any> {
  //   return this.http.delete(
  //     this.ROOT_URL + '' + params.endp,
  //     httpOptions
  //   ).pipe(
  //     catchError(ApiService.handleError)
  //   );
  // }
  //
  // public put(params: ApiParams, body): Observable<any> {
  //   return this.http.put(
  //     this.ROOT_URL + '' + params.endp,
  //     JSON.stringify(body),
  //     httpOptions
  //   ).pipe(
  //     retry(1),
  //     catchError(ApiService.handleError)
  //   );
  // }
}

