import { Injectable } from '@angular/core';
import {CrudService} from './crud.service';
import {LaundryReservation} from '../model/laundry.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LaundryDate} from "../model/laundryDate.model";


@Injectable({
  providedIn: 'root'
})
export class LaundryReservationService extends CrudService<LaundryReservation, number> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, '', '/laundry_reservation');
  }

  public getFreeReservationsForCurrentWeek(): Observable<LaundryDate[]> {
    return this.httpClient.get<LaundryDate[]>(this.baseUrl + this.endPoint + '/current_week');
  }

}
