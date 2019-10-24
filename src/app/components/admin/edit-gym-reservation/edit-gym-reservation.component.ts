import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Observer, Observable } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { GymReservation } from 'src/app/model/gym.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-gym-reservation',
  templateUrl: './edit-gym-reservation.component.html',
  styleUrls: ['./edit-gym-reservation.component.css']
})
export class EditGymReservationComponent implements OnInit {

  constructor(private fb: FormBuilder, private modal: NzModalRef, private data: DataService, private modalService: NzModalService) {
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

  
  validateForm: FormGroup;
  reservationForEdit: GymReservation;

  ngOnInit(): void {
    this.data.currentReservation.subscribe(reservation => this.reservationForEdit = reservation);
    console.log(this.reservationForEdit);
  }

  submitForm(value: any): void {
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[key].markAsDirty();
    //   this.validateForm.controls[key].updateValueAndValidity();
    // }
    // console.log(value);
    this.createComponentModal(1);
  }

  createComponentModal(id: number): void {
    // this.reservationForEdit = this.data.find(item => item.id === id);
    // this.dataService.changeReservation(this.reservationForEdit);
    // console.log(this.reservationForEdit);
    const modal = this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: EditGymReservationComponent,
      nzWrapClassName: 'vertical-center-modal',
      // nzComponentParams: {
      //   title: 'title in component',
      //   subtitle: 'component sub title，will be changed after 2 sec'
      // },
      // nzFooter: [
      //   {
      //     label: 'change component title from outside',
      //     onClick: componentInstance => {
      //       componentInstance!.submitForm(null);
      //     }
      //   }
      // ]
    });
  }

}
