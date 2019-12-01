import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import {AuthService} from './auth/auth.service';
import {text} from './texts/constants';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SRJ-Ant-Design';

  txt = text;


  private roles: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private facebookService: FacebookService) {
  }

  ngOnInit(): void {
    this.initFacebookService();
  }

  get getTokenStorage() {
    return this.tokenStorage;
  }

  get getAuthService() {
    return this.authService;
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2'};
    this.facebookService.init(initParams).then(r => console.log(r));
  }
}
