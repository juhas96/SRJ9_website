import { Component, OnInit } from '@angular/core';
import {text} from '../../texts/constants';

@Component({
  selector: 'app-successfull-login',
  templateUrl: './successfull-login.component.html',
  styleUrls: ['./successfull-login.component.css']
})
export class SuccessfullLoginComponent implements OnInit {

  txt = text;

  constructor() { }

  ngOnInit() {
  }

}
