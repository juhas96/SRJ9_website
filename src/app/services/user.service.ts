import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://147.232.191.144:8087/';

  constructor(private httpService: HttpClient) { }


  // GET /api/user/gym_reservation
  public getSingleUser(userId: number): Observable<User> {
    return this.httpService.get<User>(this.baseUrl  + 'api/user/' + userId);
  }
}
