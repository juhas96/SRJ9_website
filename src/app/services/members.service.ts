import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {


  constructor(private httpService: HttpClient) {}

  // GET /api/members
  public getAllMembers(): Observable<Member[]> {
    return this.httpService.get<Member[]>('http://localhost:8087/api/members');
  }
}
