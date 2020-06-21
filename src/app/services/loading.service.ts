import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GymReservation} from '../model/gym.model';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private data = new BehaviorSubject<boolean>(false);
  observable = this.data.asObservable();

  constructor() { }

  changeData(data: boolean) {
    this.data.next(data);
  }
}
