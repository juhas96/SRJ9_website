import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatListOption, MatSelectionList} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {LaundryService} from '../services/laundry.service';
import {Status} from '../enums/status.enum';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/api';

  currentDate = new Date();
  events: string[] = [];
  availableHours: string[];
  selectedDate: Date;
  currentSelectedTimeFrom: string;
  currentSelectedTimeUntil: string;
  status: Status;

  @ViewChild(MatSelectionList, {static: true}) selectionList: MatSelectionList;

  constructor(private laundryService: LaundryService) { }

  ngOnInit() {
    this.availableHours = this.generateAvailableHours();
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>, events: string[]) {
    events.push(`${type}: ${event.value}`);
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

  convertStringTimeToDateFormat(time: string): Date {
    const cdt = moment(time, 'HH:mm');
    return cdt.toDate();
  }

  onSelection(e, v): string {
    return e.option.value;
  }

  getValue(event) {
    console.log(event.target.parentNode.innerText);
  }

  toTimestamp(strDate) {
    const date = Date.parse(strDate);
    return date / 1000;
  }



}
