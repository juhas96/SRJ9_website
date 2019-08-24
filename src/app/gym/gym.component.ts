import { Component, OnInit } from '@angular/core';
import {Status} from '../enums/status.enum';
import {MatDatepickerInputEvent} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})
export class GymComponent implements OnInit {

  currentDate = new Date();
  events: string[] = [];
  availableHours: string[];
  selectedDate: Date;
  currentSelectedTimeFrom: string;
  currentSelectedTimeUntil: string;
  choosenGym: string;
  status: Status;
  gyms: string[] = ['T1', 'T2'];

  constructor() { }

  ngOnInit() {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>, events: string[]) {
    events.push(`${type}: ${event.value}`);
  }

  filterDays = (d: Date): boolean => {
    const day = d.getDay();

    if (this.choosenGym === 'T1') {
      return day !== 1 && day !== 3 && day !== 5 && day !== 6;
    } else {
      return day !== 0 && day !== 1 && day !== 3 && day !== 5 && day !== 6;
    }
  }

  nextWeekDay(): Date {
    let date: Date;
    date = new Date(this.currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return date;
  }

}
