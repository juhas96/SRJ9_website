import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-laundry-table',
  templateUrl: './laundry-table.component.html',
  styleUrls: ['./laundry-table.component.css']
})
export class LaundryTableComponent  implements OnInit {

  availableHours: string[];

  ngOnInit(): void {
    this.availableHours = this.generateAvailableHours();
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
}
