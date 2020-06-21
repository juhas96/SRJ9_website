import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../model/member.model';
import {CrudService} from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService extends CrudService<Member, number> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, '', '/members');
  }

}
