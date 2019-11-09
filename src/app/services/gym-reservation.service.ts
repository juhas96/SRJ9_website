import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymReservation } from '../model/gym.model';

@Injectable({
  providedIn: 'root'
})
export class GymReservationService {

  private baseUrl = 'http://147.232.191.144:8087/';

  constructor(private httpService: HttpClient) {

  }

  // GET /api/gym_reservation
  public getReservations(): Observable<GymReservation[]> {
    return this.httpService.get<GymReservation[]>(this.baseUrl + 'api/gym_reservation');
  }

  // GET /api/gym_reservation_filtered
  public getFilteredReservations(): Observable<GymReservation[]> {
    return this.httpService.get<GymReservation[]>(this.baseUrl + 'api/gym_reservation_filtered');
  }

  // GET /api/user/gym_reservation
  public getAllReservationsForSpecificUser(userId: number): Observable<GymReservation[]> {
    return this.httpService.get<GymReservation[]>(this.baseUrl  + 'api/gym_reservation/user/' + userId);
  }

  // GET /api/gym_reservation/id
  public getReservationById(id: number): Observable<GymReservation> {
    return this.httpService.get<GymReservation>(this.baseUrl  + 'api/gym_reservation/' + id);
  }

  // GET /api/gym_reservation/current_week
  public getReservationForCurrentWeek(): Observable<GymReservation[]> {
    return this.httpService.get<GymReservation[]>(this.baseUrl  + 'api/gym_reservation/current_week');
  }

  // POST /api/gym_reservation
  public createNewGymReservation(gymReservation: GymReservation): Observable<GymReservation> {
    return this.httpService.post<GymReservation>(this.baseUrl  + 'api/gym_reservation', gymReservation); // httpOptions ?
  }

  // DELETE /api/gym_reservation/id
  public deleteGymReservation(id: number): Observable<GymReservation> {
    return this.httpService.delete<GymReservation>(this.baseUrl  + 'api/gym_reservation/' + id);
  }

  // PUT /api/gym_reservation/id
  public updateGymReservation(id: number, gymReservation: GymReservation): Observable<GymReservation> {
    return this.httpService.put<GymReservation>(this.baseUrl  + 'api/gym_reservation/' + id, gymReservation, {
       headers: { 'Content-Type': 'application/json' }
    }); // httpOptions ?
  }


}
