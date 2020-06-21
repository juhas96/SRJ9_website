import { Injectable } from '@angular/core';
import {CrudOperations} from './crud.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  protected constructor(
      protected httpClient: HttpClient,
      protected baseUrl: string,
      protected endPoint?: string,
  ) {
    if (baseUrl === '') {
      this.baseUrl = 'http://localhost:8087/api';
    }
  }

  save(t: T): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + this.endPoint, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + this.endPoint + '/' + id, t, {});
  }

  findOne(id: ID): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + this.endPoint + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.baseUrl + this.endPoint);
  }

  delete(id: ID): Observable<any> {
    return this.httpClient.delete<T>(this.baseUrl + this.endPoint + '/' + id);
  }

}
