import { Component, OnInit } from '@angular/core';
import { GymReservationService } from 'src/app/services/gym-reservation.service';
import { GymReservation } from 'src/app/model/gym.model';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd';
import { User } from 'src/app/model/user.model';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.component.html',
  styleUrls: ['./gym-reservation.component.css']
})
export class GymReservationComponent implements OnInit {

  // variable for loading spinner
  isSpinning = false;

  // dates and arrays for current sunday and next sunday
  sundayDate = (moment().day() === 5 || moment().day() === 6) ? this.setReservationDate(7) : this.setReservationDate(0);
  nextSundayDate = (moment().day() === 5 || moment().day() === 6) ? this.setReservationDate(14) : this.setReservationDate(7);
  sundayDateTable = (moment().day() === 5 || moment().day() === 6) ? this.setTableDate(7) : this.setTableDate(0);
  nextSundayDateTable = (moment().day() === 5 || moment().day() === 6) ? this.setTableDate(14) : this.setTableDate(7);
  sundayArray: GymReservation[];
  nextSundayArray: GymReservation[];

  tuesdayDate = (moment().day() === 5 || moment().day() === 6) ? this.setReservationDate(9) : this.setReservationDate(2);
  nextTuesdayDate = (moment().day() === 5 || moment().day() === 6) ? this.setReservationDate(16) : this.setReservationDate(9);
  tuesdayDateTable = (moment().day() === 5 || moment().day() === 6) ? this.setTableDate(9) : this.setTableDate(2);
  nextTuesdayDateTable = (moment().day() === 5 || moment().day() === 6) ? this.setTableDate(16) : this.setTableDate(9);
  tuesdayArray: GymReservation[];
  nextTuesdayArray: GymReservation[];

  thursdayDate = (moment().day() === 5 || moment().day() === 6) ? this.setReservationDate(11) : this.setReservationDate(4);
  nextThursdayDate = (moment().day() === 5 || moment().day() === 6) ? this.setReservationDate(18) : this.setReservationDate(11);
  thursdayDateTable = (moment().day() === 5 || moment().day() === 6) ? this.setTableDate(11) : this.setTableDate(4);
  nextThursdayDateTable = (moment().day() === 5 || moment().day() === 6) ? this.setTableDate(18) : this.setTableDate(11);
  thursdayArray: GymReservation[];
  nextThursdayArray: GymReservation[];

  reservation: GymReservation;






  constructor(private gymService: GymReservationService,
              private modalService: NzModalService,
              private notificationService: NotificationService,
              private userService: UserService,
              private cookiesService: CookieService) {
   }

  ngOnInit() {

    this.gymService.getReservations().subscribe(data => {
      this.sundayArray = data.filter(value => value.date === this.sundayDate);
      this.nextSundayArray = data.filter(value => value.date === this.nextSundayDate);

      this.tuesdayArray = data.filter(value => value.date === this.tuesdayDate);
      this.nextTuesdayArray = data.filter(value => value.date === this.nextTuesdayDate);

      this.thursdayArray = data.filter(value => value.date === this.thursdayDate);
      this.nextThursdayArray = data.filter(value => value.date === this.nextThursdayDate);
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


        user.id = +this.cookiesService.get('UserId');
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

  // this function returns specific date format in string by given day of week (e.g. for day=0 it returns current sunday, 7 for next sunday)
  setReservationDate(day: number): string{
    return  moment().day(day).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000');
  }

  // this function returns specific date format in string for tables by gjven day of week (e.g. 0 for sunday, 7 for next sunday)
  setTableDate(day: number): string{
    return moment().day(day).format('DD.MM.YYYY');
  }


}
