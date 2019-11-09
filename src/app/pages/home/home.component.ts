import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {text} from '../../texts/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  txt = text;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get getAuthService() {
    return this.authService;
  }

}
