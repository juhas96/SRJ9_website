import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatListOption, MatSelectionList} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {Laundry} from '../model/laundry.model';
import * as moment from 'moment';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {

  currentDate = new Date();
  events: string[] = [];
  availableHours: string[];
  laundry: Laundry;
  currentSelectedTimeFrom: string;
  currentSelectedTimeUntil: string;

  @ViewChild(MatSelectionList, {static: true}) selectionList: MatSelectionList;

  constructor() {}

  ngOnInit() {
    this.availableHours = this.generateAvailableHours();
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
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

  convertStringTimeToDateFormat(time: string) {
    const cdt = moment(time, 'HH:mm');
    cdt.toDate();
    console.log(cdt.format('YYYY/MM/DD HH:mm'));
  }

  onSelection(e, v) {
    this.currentSelectedTimeFrom = e.option.value;
  }

  getValue(event) {
    console.log(event.target.parentNode.innerText);
  }

  toTimestamp(strDate) {
    const date = Date.parse(strDate);
    return date / 1000;
  }

}
