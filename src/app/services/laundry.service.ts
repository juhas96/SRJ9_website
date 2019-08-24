import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {
  constructor(private api: ApiService) { }

  // HttpClient API post() method => Create reservation
  createLaundryReservation(laundry): Subscription {
    return this.api.post({ endp: '/laundry_reservation' }, laundry).subscribe();
  }

  // HttpClient API get() method => Get all reservations
  getAllLaundryReservation(): Subscription {
    return this.api.get({endp: '/laundry_reservation'}).subscribe();
  }

  // HttpClient API get() method => Get single reservation
  getSingleLaundryReservation(id): Subscription {
    return this.api.get({endp: '/laundry_reservatopm/' + id}).subscribe();
  }

  // HttpClient API put() method => Update existing reservation
  updateLaundryReservation(laundry): Subscription {
    return this.api.put({endp: '/laundry_reservation'}, laundry).subscribe();
  }

  // HttpClient API delete() method => Delete existing reservation
  deleteLaundryReservation(id): Subscription {
    return this.api.delete({endp: '/laundry_reservation/' + id}).subscribe();
  }
}
