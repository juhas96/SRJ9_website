import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  }

}
