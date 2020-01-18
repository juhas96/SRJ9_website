import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUrl = 'http://147.232.191.144:8087/';

  constructor(private httpService: HttpClient) {}

  // GET /api/members
  public getAllMembers(): Observable<Member[]> {
    return this.httpService.get<Member[]>(this.baseUrl + 'api/members');
  }

}
