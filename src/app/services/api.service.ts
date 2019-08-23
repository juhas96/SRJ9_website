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

  readonly ROOT_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public post(params: ApiParams, body): Observable<any> {
    return this.http.post(
      this.ROOT_URL + '' + params.endp,
      JSON.stringify(body),
      httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get cliend-side error
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
