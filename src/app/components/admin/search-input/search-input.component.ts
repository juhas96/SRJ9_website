import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  bigList: string[] = new Array(10000).fill(0).map((_, i) => i.toString(36) + i);
  optionList: string[] = [];
  selectedUser: string;
  displayTips = true;

  onSearch(value: string): void {
    if (value && value.length > 1) {
      this.optionList = this.bigList.filter(item => item.indexOf(value) > -1);
      this.displayTips = false;
    } else {
      this.optionList = [];
      this.displayTips = true;
    }
  }

  constructor() {}

  ngOnInit() {
  }

}
