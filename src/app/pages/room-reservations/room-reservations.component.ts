import { Component, OnInit } from '@angular/core';
import {TransferItem} from "ng-zorro-antd";

@Component({
  selector: 'app-room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css']
})
export class RoomReservationsComponent implements OnInit {

  current = 0;
  index = 'First-content';
  selectedBlock;
  selectedFloor;
  selectedRoom;
  text = 'Vyber si blok na ktorom chceš bývať';
  list: TransferItem[] = [];
  disabled = false;
  showSearch = true;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
        tag: ['cat', 'dog', 'bird'][i % 3]
      });
    }

    [2, 3].forEach(idx => (this.list[idx].direction = 'right'));
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        this.text = 'Vyber si blok na ktorom chceš bývať';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        this.text = 'Vyber si poschodie na ktorom chceš bývať';
        break;
      }
      case 2: {
        this.index = 'third-content';
        this.text = 'Vyber si izbu na ktorej chceš bývať';
        break;
      }
      case 3: {
        this.index = 'third-content';
        this.text = 'Chceš pridať spolubývajúcich?';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  convertItems(items: TransferItem[]): TransferItem[] {
    return items.filter(i => !i.hide);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

}
