import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Laundry} from '../model/laundry.model';
import {Status} from '../enums/status.enum';
import {Observable, throwError} from 'rxjs';
import {Timestamp} from 'rxjs/internal-compatibility';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {
  constructor(private api: ApiService) { }

  // HttpClient API post() method => Create reservation
  createLaundryReservation(laundry): Observable<Laundry> {
    return this.api.post({ endp: '/laundry_reservation' }, laundry);
  }
}
