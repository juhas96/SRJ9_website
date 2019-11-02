import { Component, OnInit } from '@angular/core';
import { GymReservation } from 'src/app/model/gym.model';
import { GymReservationService } from 'src/app/services/gym-reservation.service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {

  data: GymReservation[] = [];
  loading = true;

  constructor(private gymReservationService: GymReservationService) {}

  ngOnInit(): void {
    this.searchData();
  }

  searchData() {
    this.loading = true;
    this.gymReservationService
      .getAllReservationsForSpecificUser(2)
      .subscribe(
        (res) => this.data = res,
        (err) => console.log(err),
        () => this.loading = false
      );
  }
}
