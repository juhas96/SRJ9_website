import { Component, OnInit } from '@angular/core';
import { SignupInfo } from '../../signup-info';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {text} from '../../../texts/constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  validateForm: FormGroup;
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  isLoading = false;
  emailValidationPattern = '^[A-Za-z0-9._%+-]+@student.tuke.sk$';
  txt = text;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      // tslint:disable-next-line: forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }

      this.signupInfo = new SignupInfo(
          this.parseFirstNameFromEmail(this.validateForm.get('email').value),
          this.parseLastNameFromEmail(this.validateForm.get('email').value),
          this.parseUsernameFromEmail(this.validateForm.get('email').value),
          this.validateForm.get('email').value + '@student.tuke.sk',
          this.validateForm.get('password').value);

      this.authService.signUp(this.signupInfo).subscribe(
          () => {
            this.isLoading = false;
            this.isSignedUp = true;
            this.isSignUpFailed = false;
            this.router.navigate(['/successfull-registration']);
          },
          error => {
            if (error.status === 400) {
              this.notificationService.createNotification('error',
                  this.txt.errors.sameEmailAddressErrorTitle,
                  this.txt.errors.sameEmailAddressErrorDesc);
            }
            this.isLoading = false;
            this.isSignUpFailed = true;
          }
      );
    } else {
      this.isLoading = false;
      this.notificationService.createNotification('error',
          this.txt.errors.invalidFormularTitle, this.txt.errors.invalidFormularDesc);
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required, Validators.pattern(this.emailValidationPattern)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  parseUsernameFromEmail(email: string) {
    return email.substring(0, email.indexOf('@'));
  }

  parseFirstNameFromEmail(email: string) {
    return email.substring(0, email.indexOf('.'));
  }

  parseLastNameFromEmail(email: string) {
    return email.substring(email.indexOf('.') + 1, email.indexOf('@'));
  }

}
