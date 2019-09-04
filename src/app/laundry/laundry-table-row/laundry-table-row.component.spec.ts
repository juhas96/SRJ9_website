import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryTableRowComponent } from './laundry-table-row.component';

describe('LaundryTableRowComponent', () => {
  let component: LaundryTableRowComponent;
  let fixture: ComponentFixture<LaundryTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
