import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  // generateTime() {
  //   const times = [];
  //   new Array.from().fill().forEach((acc, index) => {
  //     times.push(moment( {hour: index} ).format('h:mm A'));
  //     times.push(moment( {hour: index, minute: 30} ).format('h:mm A'));
  //   });
  //
  //   return times;
  // }
}
