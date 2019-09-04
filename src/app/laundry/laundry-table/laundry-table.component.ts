import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-laundry-table',
  templateUrl: './laundry-table.component.html',
  styleUrls: ['./laundry-table.component.css']
})
export class LaundryTableComponent  implements OnInit {

  availableHours: string[];
  reservationDates: string[];
  checkList: any[];
  currentlySelectedHours: any[];

  ngOnInit(): void {
    this.availableHours = this.generateAvailableHours();
    this.reservationDates = this.convertDateToStringFormat(this.generateCurrentReservationDates());
  }

  generateAvailableHours(): string[] {
    const arr = [];
    let i;
    let j;
    for (i = 6; i < 22; i++) {
      for (j = 0; j < 2; j++) {
        arr.push(i + ':' + (j === 0 ? '00' : 30 * j) );
      }
    }
    return arr;
  }

  generateCurrentReservationDates(): Date[] {
    const dates: Date[] = [new Date(), new Date(), new Date()];
    const currentDate = new Date();
    dates.map((value, i) => value.setDate(currentDate.getDate() + i++));
    console.log(dates);
    return dates;
  }

  convertDateToStringFormat(dates: Date[]): string[] {
    const formatedDates: string[] = [];

    dates.map((value) => {
      formatedDates.push((value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear()).toString());
    });

    console.log(formatedDates);
    return formatedDates;
  }

  onCheckboxClick() {

  }
}
