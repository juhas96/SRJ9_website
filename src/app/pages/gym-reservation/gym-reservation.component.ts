import { Component, OnInit } from '@angular/core';
import { GymReservationService } from 'src/app/services/gym-reservation.service';
import { GymReservation } from 'src/app/model/gym.model';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { User } from 'src/app/model/user.model';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.component.html',
  styleUrls: ['./gym-reservation.component.css']
})
export class GymReservationComponent implements OnInit {

  /* gridStyle = {
    width: '25%',
    textAlign: 'center'
  }; */

  isSpinning = false;

  // dates and arrays for current sunday and next sunday
  sundayDate = moment().day(0).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // zero for sunday
  nextSundayDate = moment().day(7).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // seven (0+7) for next sunday
  sundayDateTable = moment().day(0).format('DD.MM.YYYY'); // variable for writing sunday date in table e.g. 20.10.2010
  nextSundayDateTable = moment().day(7).format('DD.MM.YYYY');
  sundayArray: GymReservation[];
  nextSundayArray: GymReservation[];

  tuesdayDate = moment().day(2).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // two for tuesay
  nextTuesdayDate = moment().day(9).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // nine (2+7) for next tuesday
  tuesdayDateTable = moment().day(2).format('DD.MM.YYYY');
  nextTuesdayDateTable = moment().day(9).format('DD.MM.YYYY');
  tuesdayArray: GymReservation[];
  nextTuesdayArray: GymReservation[];

  thursdayDate = moment().day(4).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // four for thursday
  nextThursdayDate = moment().day(11).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // eleven (4+7) for next thursday
  thursdayDateTable = moment().day(4).format('DD.MM.YYYY');
  nextThursdayDateTable = moment().day(11).format('DD.MM.YYYY');
  thursdayArray: GymReservation[];
  nextThursdayArray: GymReservation[];

  reservation: GymReservation;






  constructor(private gymService: GymReservationService,
              private modalService: NzModalService,
              private notificationService: NotificationService,
              private userService: UserService) {
   }

  ngOnInit() {

    this.gymService.getReservations().subscribe(data => {
      this.sundayArray = data.filter(value => value.date == this.sundayDate);
      this.nextSundayArray = data.filter(value => value.date == this.nextSundayDate);
      this.sundayArray.sort( (a, b) => a.id - b.id);

      this.tuesdayArray = data.filter(value => value.date == this.tuesdayDate);
      this.nextTuesdayArray = data.filter(value => value.date == this.nextTuesdayDate);
      console.log('utorok datum je ' + this.nextTuesdayDate);
      console.log(this.tuesdayArray);
      this.thursdayArray = data.filter(value => value.date == this.thursdayDate);
      this.nextThursdayArray = data.filter(value => value.date == this.nextThursdayDate);
      console.log('stvrtok datum - ' + this.nextThursdayDate);
      console.log(this.nextThursdayArray);

      console.log('toto je userid ' + sessionStorage.getItem('UserId'));

    });
  }


  showConfirm(reservation: GymReservation): void {
    // this.reservation=reservation
    this.modalService.confirm({
      nzTitle: '<i>Do you really want to reserve this reservation ?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzCancelText: 'Cancel',
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.isSpinning = true;
        console.log('OK');
        this.reservation = reservation;

        this.reservation.status = 'RESERVED';
        const user: User = new User();
        this.reservation.user = user;


        user.id = +sessionStorage.getItem('UserId');
        this.userService.getSingleUser(user.id).subscribe(
            (val: User) => {
              console.log('PRISLO MI: ' + val.email);
              this.reservation.user = val;
            });
        // this.reservation.user.id = 4;
        // this.reservation.user = user;

        this.gymService.updateGymReservation(this.reservation.id, this.reservation).subscribe(
            () => {},
            (err) => {
              if (err.status === 400) {
                this.isSpinning = false;
                this.notificationService.createNotification('error',
                    'Too many reservations for one week',
                    'You have 2 reservations for current week.');
                this.reservation.status = 'FREE';
                this.reservation.user = null;
              } else {
                this.isSpinning = false;
                this.notificationService.createNotification('error',
                    'Error',
                    'Reservation cannot be created.');
                this.reservation.status = 'FREE';
                this.reservation.user = null;
              }
            },
            () => {
              this.notificationService.createNotification('success', 'Reserved', 'Reservation was successfully created.');
              this.isSpinning = false;
            }
        );
      }
      });
  }

  parseUsernameFromEmail(email: string) {
    if (email) {
      return email.substring(0, email.indexOf('@'));
    }
  }


}
