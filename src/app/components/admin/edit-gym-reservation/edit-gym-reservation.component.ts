import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Observer, Observable } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd';
import { GymReservation } from 'src/app/model/gym.model';

@Component({
  selector: 'app-edit-gym-reservation',
  templateUrl: './edit-gym-reservation.component.html',
  styleUrls: ['./edit-gym-reservation.component.css']
})
export class EditGymReservationComponent implements OnInit {
  @Output() reservationForEdit = new EventEmitter<GymReservation>();

  ngOnInit(): void {console.log(this.reservationForEdit);}



  validateForm: FormGroup;

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  constructor(private fb: FormBuilder, private modal: NzModalRef) {
    this.validateForm = this.fb.group({
      date: ['', Validators.required],
      reservation_number: [{value: '', disabled: true}],
      user: ['', Validators.required],
      time_from: ['', Validators.required],
      time_until: ['', Validators.required],
      status: ['', Validators.required],
      gym_number: ['', Validators.required]
    });
  }

}
