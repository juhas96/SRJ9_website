import { TestBed } from '@angular/core/testing';

import { LaundryReservationService } from './laundry-reservation.service';

describe('LaundryReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaundryReservationService = TestBed.get(LaundryReservationService);
    expect(service).toBeTruthy();
  });
});
