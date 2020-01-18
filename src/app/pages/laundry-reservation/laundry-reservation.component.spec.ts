import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryReservationComponent } from './laundry-reservation.component';

describe('LaundryReservationComponent', () => {
  let component: LaundryReservationComponent;
  let fixture: ComponentFixture<LaundryReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
