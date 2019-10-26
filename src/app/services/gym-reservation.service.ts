import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymReservation } from '../model/gym.model';

@Injectable({
  providedIn: 'root'
})
export class GymReservationService {

  constructor(private httpService: HttpClient) {

  }

  // GET /api/gym_reservation
  public getReservations(): Observable<GymReservation[]> {
    return this.httpService.get<GymReservation[]>('http://localhost:8087/api/gym_reservation');
  }

  // GET /api/gym_reservation/id
  public getReservationById(id: Number): Observable<GymReservation> {
    return this.httpService.get<GymReservation>('http://localhost:8087/api/gym_reservation/' + id);
  }

  // GET /api/gym_reservation/current_week
  public getReservationForCurrentWeek(): Observable<GymReservation[]> {
    return this.httpService.get<GymReservation[]>('http://localhost:8087/api/gym_reservation/current_week');
  }

  // POST /api/gym_reservation
  public createNewGymReservation(gymReservation: GymReservation): Observable<GymReservation> {
    return this.httpService.post<GymReservation>('http://localhost:8087/api/gym_reservation', gymReservation); //httpOptions ? 
  }

  // DELETE /api/gym_reservation/id
  public deleteGymReservation(id: Number): Observable<GymReservation> {
    return this.httpService.delete<GymReservation>('http://localhost:8087/api/gym_reservation/' + id)
  }

  // PUT /api/gym_reservation/id
  public updateGymReservation(id: Number, gymReservation: GymReservation): Observable<GymReservation> {
    return this.httpService.put<GymReservation>('http://localhost:8087/api/gym_reservation/' + id, gymReservation) //httpOptions ?
  }


}
