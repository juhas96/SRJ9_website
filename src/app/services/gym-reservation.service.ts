import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymReservation } from '../model/gym.model';
import {CrudService} from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class GymReservationService extends CrudService<GymReservation, number> {


  constructor(protected httpClient: HttpClient) {
    super(httpClient, '', '/gym_reservation');
  }

  // GET /api/gym_reservation_filtered
  public getFilteredReservations(): Observable<GymReservation[]> {
    return this.httpClient.get<GymReservation[]>(this.baseUrl + '/gym_reservation_filtered');
  }

  // GET /api/user/gym_reservation
  public getAllReservationsForSpecificUser(userId: number): Observable<GymReservation[]> {
    return this.httpClient.get<GymReservation[]>(this.baseUrl  + '/gym_reservation/user/' + userId);
  }

  // GET /api/gym_reservation/current_week
  public getReservationForCurrentWeek(): Observable<GymReservation[]> {
    return this.httpClient.get<GymReservation[]>(this.baseUrl  + this.endPoint + '/current_week');
  }

}
