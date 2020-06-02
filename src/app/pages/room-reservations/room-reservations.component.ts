import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css']
})
export class RoomReservationsComponent implements OnInit {
  validateForm: FormGroup;
  emailValidationPattern = '^[A-Za-z0-9._%+-]+@student.tuke.sk$';
  isLoading = false;
  room: string;
  firstUserName: string;
  firstUserEmail: string;
  secondUserName: string;
  secondUserEmail: string;
  thirdUserName: string;
  thirdUserEmail: string;
  fourthUserName: string;
  fourthUserEmail: string;

  options = [
    {
      value: 'a',
      label: 'Blok A',
      children: [
        {
          value: '1',
          label: '1. Poschodie',
          children: [
            {
              value: '101',
              label: 'Izba č. 101',
              isLeaf: true
            }
          ]
        },
        {
          value: '2',
          label: '2. Poschodie',
          children: [
            {
              value: '101',
              label: 'Izba č. 101',
              isLeaf: true
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      room: ['', [Validators.required]],
      firstUserName: ['', [Validators.required]],
      secondUserName: [''],
      thirdUserName: [''],
      fourthUserName: [''],
      firstUserEmail: ['', [Validators.email, Validators.required, Validators.pattern(this.emailValidationPattern)]],
      secondUserEmail: ['', [
          Validators.email,
          Validators.pattern(this.emailValidationPattern)
      ]],
      thirdUserEmail: ['', [
        Validators.email,
        Validators.pattern(this.emailValidationPattern)
      ]],
      fourthUserEmail: ['', [
        Validators.email,
        Validators.pattern(this.emailValidationPattern)
      ]],
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      console.log('VALID');

      this.isLoading = true;
      // tslint:disable-next-line: forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    } else {
      console.log('INVALID');
    }
  }

  updateValidations() {
    if (this.validateForm.get('secondUserName').value) {
      this.validateForm.get('secondUserName')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
      this.validateForm.get('secondUserName').updateValueAndValidity();
    } else {
      this.validateForm.get('secondUserName').clearValidators();
      this.validateForm.get('secondUserName').updateValueAndValidity();
    }

    if (this.validateForm.get('thirdUserName').value) {
      this.validateForm.get('thirdUserName')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
      this.validateForm.get('thirdUserName').updateValueAndValidity();
    } else {
      this.validateForm.get('thirdUserName').clearValidators();
      this.validateForm.get('thirdUserName').updateValueAndValidity();
    }

    if (this.validateForm.get('fourthUserName').value) {
      this.validateForm.get('fourthUserName')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
      this.validateForm.get('fourthUserName').updateValueAndValidity();
    } else {
      this.validateForm.get('fourthUserName').clearValidators();
      this.validateForm.get('fourthUserName').updateValueAndValidity();
    }
  }
}
