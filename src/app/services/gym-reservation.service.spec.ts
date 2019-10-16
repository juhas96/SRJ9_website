import { TestBed } from '@angular/core/testing';

import { GymReservationService } from './gym-reservation.service';

describe('GymReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GymReservationService = TestBed.get(GymReservationService);
    expect(service).toBeTruthy();
  });
});
