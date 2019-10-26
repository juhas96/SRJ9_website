import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGymReservationComponent } from './edit-gym-reservation.component';

describe('EditGymReservationComponent', () => {
  let component: EditGymReservationComponent;
  let fixture: ComponentFixture<EditGymReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGymReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGymReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
