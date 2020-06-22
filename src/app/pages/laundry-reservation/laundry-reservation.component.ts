import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-laundry-reservation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './laundry-reservation.component.html',
  styleUrls: ['./laundry-reservation.component.css']
})
export class LaundryReservationComponent implements OnInit {


  viewDate: Date = new Date();

  timeFromClicked: Date;
  timeUntilClicked: Date;

  // events: CalendarEvent[] = [
  //   {
  //     title: 'Non editable and deletable event',
  //     // color: colors.red,
  //     start: new Date()
  //   }
  // ];

  constructor() { }

  ngOnInit() {
  }

  // addTimeFromAndTimeUntil(event) {
  //   if (!this.timeFromClicked || event.date < this.timeFromClicked) {
  //     this.timeFromClicked = event.date;
  //   } else {
  //     this.timeUntilClicked = event.date;
  //   }
  //
  //   if (this.timeFromClicked && this.timeUntilClicked) {
  //     this.events.push(
  //         {
  //           title: 'New Event',
  //           start: this.timeFromClicked,
  //           end: this.timeUntilClicked
  //         }
  //     );
  //   }
  // }

  generateArray(value: number): number[] {
    return new Array(value);
  }
}
