import {Injectable} from '@angular/core';
import {BehaviorSubject, interval} from 'rxjs';
import {RoomReservationStatus} from '../enums/room-reservation-status.enum';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  startReservationsString = 'Jun 22, 2020 11:00:00';
  endReservationsString = 'Jun 22, 2020 18:00:00';
  startDate: Date;
  endDate: Date;
  private data = new BehaviorSubject<RoomReservationStatus>(RoomReservationStatus.BEFORE);
  observable = this.data.asObservable();
  startDateValue;
  endDateValue;

  constructor() {
    this.startDate = new Date(this.startReservationsString);
    this.endDate = new Date(this.endReservationsString);
    interval(1000).pipe(
        map((x) => {
          return Math.floor((this.startDate.getTime() - new Date().getTime()) / 1000);
        })
    ).subscribe(res => {
      if (res > 0) {
        this.changeData(RoomReservationStatus.BEFORE);
      }
      this.startDateValue = res;
    });

    interval(1000).pipe(
        map((x) => {
          return Math.floor((this.endDate.getTime() - new Date().getTime()) / 1000);
        })
    ).subscribe(res => {
      if (res > 0 && this.startDateValue <= 0) {
        this.changeData(RoomReservationStatus.CURRENT);
      }
      if (res <= 0 && this.startDateValue <= 0) {
        this.changeData(RoomReservationStatus.AFTER);
      }
      this.endDateValue = res;
    });
  }

  changeData(status: RoomReservationStatus) {
    this.data.next(status);
  }
}
