import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/model/member.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[] = [];

  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.findMembers();
  }

  findMembers() {
    this.membersService
      .getAllMembers()
      .subscribe(
        (res) => this.members = res,
        (err) => console.log(err),
      );
  }

}
