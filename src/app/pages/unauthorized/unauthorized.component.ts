import { Component, OnInit } from '@angular/core';
import {text} from '../../texts/constants';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  txt = text;

  constructor() { }

  ngOnInit() {
  }

}
