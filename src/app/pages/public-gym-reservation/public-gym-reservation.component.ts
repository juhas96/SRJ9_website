import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {GymReservation} from '../../model/gym.model';
import {GymReservationService} from '../../services/gym-reservation.service';
import {text} from '../../texts/constants';

@Component({
  selector: 'app-public-gym-reservation',
  templateUrl: './public-gym-reservation.component.html',
  styleUrls: ['./public-gym-reservation.component.css']
})
export class PublicGymReservationComponent implements OnInit {

  isSpinning = false;
  @Input() isEditable = false;

  // dates and arrays for current sunday and next sunday
  sundayDate = moment().day(0).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // zero for sunday
  nextSundayDate = moment().day(7).hour(1).minute(0)
      .second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // seven (0+7) for next sunday
  sundayDateTable = moment().day(0).format('DD.MM.YYYY'); // variable for writing sunday date in table e.g. 20.10.2010
  nextSundayDateTable = moment().day(7).format('DD.MM.YYYY');
  sundayArray: GymReservation[];
  nextSundayArray: GymReservation[];

  tuesdayDate = moment().day(2).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // two for tuesay
  nextTuesdayDate = moment().day(9).hour(1).minute(0)
      .second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // nine (2+7) for next tuesday
  tuesdayDateTable = moment().day(2).format('DD.MM.YYYY');
  nextTuesdayDateTable = moment().day(9).format('DD.MM.YYYY');
  tuesdayArray: GymReservation[];
  nextTuesdayArray: GymReservation[];

  thursdayDate = moment().day(4).hour(1).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // four for thursday
  nextThursdayDate = moment().day(11).hour(1).minute(0)
      .second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS+0000'); // eleven (4+7) for next thursday
  thursdayDateTable = moment().day(4).format('DD.MM.YYYY');
  nextThursdayDateTable = moment().day(11).format('DD.MM.YYYY');
  thursdayArray: GymReservation[];
  nextThursdayArray: GymReservation[];

  reservation: GymReservation;
  txt = text;

  constructor(private gymService: GymReservationService) {
  }

  ngOnInit() {
    this.gymService.findAll().subscribe(data => {
      this.sundayArray = data.filter(value => value.date === this.sundayDate);
      this.nextSundayArray = data.filter(value => value.date === this.nextSundayDate);
      this.sundayArray.sort( (a, b) => a.id - b.id);

      this.tuesdayArray = data.filter(value => value.date === this.tuesdayDate);
      this.nextTuesdayArray = data.filter(value => value.date === this.nextTuesdayDate);
      this.thursdayArray = data.filter(value => value.date === this.thursdayDate);
      this.nextThursdayArray = data.filter(value => value.date === this.nextThursdayDate);
    },
        (error => console.log(error)));
  }

  parseUsernameFromEmail(email: string) {
    if (email) {
      return email.substring(0, email.indexOf('@'));
    }
  }

}
