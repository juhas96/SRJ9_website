import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckExistingLaundryReservationComponent } from './check-existing-laundry-reservation.component';

describe('CheckExistingLaundryReservationComponent', () => {
  let component: CheckExistingLaundryReservationComponent;
  let fixture: ComponentFixture<CheckExistingLaundryReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckExistingLaundryReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckExistingLaundryReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
