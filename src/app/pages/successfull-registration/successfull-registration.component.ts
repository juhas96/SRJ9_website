import { Component, OnInit } from '@angular/core';
import {text} from '../../texts/constants';

@Component({
  selector: 'app-successfull-registration',
  templateUrl: './successfull-registration.component.html',
  styleUrls: ['./successfull-registration.component.css']
})
export class SuccessfullRegistrationComponent implements OnInit {

  txt = text;

  constructor() { }

  ngOnInit() {
  }

}
