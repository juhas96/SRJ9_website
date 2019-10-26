import { Injectable } from '@angular/core';

import { GymReservation } from '../model/gym.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private gymReservation = new BehaviorSubject<GymReservation>(new GymReservation());
  currentReservation = this.gymReservation.asObservable();

  constructor() { }

  changeReservation(reservation: GymReservation) {
    this.gymReservation.next(reservation);
  }
}
