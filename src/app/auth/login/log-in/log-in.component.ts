import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../../login-info';
import { AuthService } from '../../auth.service';
import { TokenStorageService } from '../../token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  form: any = {};
  isLoginFailed = false;
  roles: string[] = [];
  loginInfo: AuthLoginInfo;
  validateForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationService) { }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.loginInfo = new AuthLoginInfo(
      this.validateForm.get('userName').value,
      this.validateForm.get('password').value
    );
    this.isLoading = true;

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveUserId(data.user_id);

        this.isLoading = true;
        this.isLoginFailed = false;
        this.authService.setLoggedIn(true);
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate(['/welcome-page']);
      },
      error => {
        if (error.status === 401) {
          this.notificationService.createNotification('error',
              'Log In error',
              'Your username or password is not correct. Try again or contact page administrator');
        } else if (error.status === 500) {
          this.notificationService.createNotification('error',
              'Log In Error',
              'Your account is probably not authorized yet.');
        }
        this.isLoading = true;
        this.isLoginFailed = true;
      }
    );
  }



  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.authService.setLoggedIn(true);
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  get getAuthService() {
    return this.authService;
  }

  reloadPage() {
    window.location.reload();
  }
}
