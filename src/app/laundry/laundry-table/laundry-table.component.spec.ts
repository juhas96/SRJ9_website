import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryTableComponent } from './laundry-table.component';

describe('LaundryTableComponent', () => {
  let component: LaundryTableComponent;
  let fixture: ComponentFixture<LaundryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
