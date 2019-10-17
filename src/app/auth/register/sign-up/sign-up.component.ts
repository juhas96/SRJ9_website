import { Component, OnInit } from '@angular/core';
import { SignupInfo } from '../../signup-info';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
  emailValidationPattern = '^[A-Za-z0-9._%+-]+@student.tuke.sk$';

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.signupInfo = new SignupInfo (
      'test',
      this.parseUsernameFromEmail(this.validateForm.get('email').value),
      this.validateForm.get('email').value,
      this.validateForm.get('password').value);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.isSignUpFailed = true;
      }
    );
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
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required, Validators.pattern(this.emailValidationPattern)]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [false]
    });
  }

  parseUsernameFromEmail(email: string) {
    return email.substring(0, email.indexOf('@'));
  }

}
