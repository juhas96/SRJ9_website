import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import * as firebase from 'firebase';
import {RoomReservationsService} from '../../services/room-reservations.service';
import {map, tap} from 'rxjs/operators';
import {DropdownRoom} from '../../model/dropdown-room.model';
import {Room} from '../../model/room.model';

@Component({
  selector: 'app-room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css']
})
export class RoomReservationsComponent implements OnInit {
  validateForm: FormGroup;
  emailValidationPattern = '^[A-Za-z0-9._%+-]+@student.tuke.sk$';
  isLoading = false;
  roomCapacity = 0;
  allRooms: Room[];
  options: DropdownRoom[] = [
    {
      value: 'A',
      label: 'Blok A',
      children: []
    },
    {
      value: 'B',
      label: 'Blok B',
      children: []
    },
    {
      value: 'C',
      label: 'Blok C',
      children: []
    },
    {
      value: 'D',
      label: 'Blok D',
      children: []
    }
  ];

  constructor(private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationService,
              private roomReservationsService: RoomReservationsService) {
  }

  ngOnInit() {
    this.roomReservationsService.getAllRooms().pipe(
        map(arr => {
          return arr.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            } as Room;
          });
        })
    ).subscribe(res => {
      console.log('ROOMS', res);
      this.allRooms = res;
      this.fillUpWholeBlockA(res);
      // this.updateCapacity();
    });
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

  fillUpWholeBlockA(rooms: Room[]) {
    console.log('TEST');
    this.options.find(block => block.value === 'A').children.forEach(optionFloor => {
      optionFloor.children.forEach(optionRoom => {
        if (!rooms.filter(block => block.block === 'A')
            .filter(floor => floor.floor.toString() === optionFloor.value)
            .find(room => room.roomNumber === optionRoom.value)) {
          optionFloor.children.splice(optionFloor.children.indexOf(optionRoom));
        }
      });
    });
    rooms
        .filter(block => block.block === 'A')
        .filter(floor => floor.floor === 1)
        .forEach(room => {
            let firstFloor: {value: string, label: string, children: [{value: string, label: string, isLeaf: boolean, capacity: number}?]};
            if (!this.options.find(block => block.value === 'A').children.find(floor => floor.value === '1')) {
                this.options.find(block => block.value === 'A').children.push({value: '1', label: '1. Poschodie', children: []});
                firstFloor = this.options.find(block => block.value === 'A').children.find(floor => floor.value === '1');
            } else {
              firstFloor = this.options.find(block => block.value === 'A').children.find(floor => floor.value === '1');
            }
            if (!firstFloor.children.find(x => x.value === room.roomNumber)) {
              firstFloor.children.push({
                value: room.roomNumber,
                label: 'Izba č.' + room.roomNumber + ' (' + room.capacity + ')',
                isLeaf: true,
                capacity: room.capacity
              });
            } else {
              firstFloor.children.find(x => x.value === room.roomNumber).value = room.roomNumber;
              firstFloor.children.find(x => x.value === room.roomNumber).label = 'Izba č.' + room.roomNumber + ' (' + room.capacity + ')';
              firstFloor.children.find(x => x.value === room.roomNumber).capacity = room.capacity;
            }
          }
        );
  }

  updateCapacity() {
    console.log(this.validateForm.get('room').value);
    this.roomCapacity = this.allRooms
       .find(block => block.block === this.validateForm
           .get('room').value[0] && block.floor == this.validateForm
           .get('room').value[1] && block.roomNumber === this.validateForm
           .get('room').value[2]).capacity;
  }
}
