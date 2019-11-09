import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicGymReservationComponent } from './public-gym-reservation.component';

describe('PublicGymReservationComponent', () => {
  let component: PublicGymReservationComponent;
  let fixture: ComponentFixture<PublicGymReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicGymReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicGymReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
