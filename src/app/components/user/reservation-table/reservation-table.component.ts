import { Component, OnInit } from '@angular/core';
import { GymReservation } from 'src/app/model/gym.model';
import { GymReservationService } from 'src/app/services/gym-reservation.service';
import {NotificationService} from '../../../services/notification.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {

  data: GymReservation[] = [];
  loading = true;

  constructor(private gymReservationService: GymReservationService,
              private notificationService: NotificationService,
              private cookiesService: CookieService) {}

  ngOnInit(): void {
    this.searchData();
  }

  searchData() {
    this.loading = true;
    this.gymReservationService
      .getAllReservationsForSpecificUser(parseInt(this.cookiesService.get('UserId'), 10))
      .subscribe(
        (res) => this.data = res,
        (err) => this.notificationService.createNotification('error', 'Reservations can\'t be loaded', err),
        () => this.loading = false
      );
  }

  deleteReservation(id: number, gymReservation: GymReservation) {
    gymReservation.user = null;
    gymReservation.status = 'FREE';
    console.log(gymReservation);
    this.gymReservationService.updateGymReservation(id, gymReservation).subscribe(
        () => {
          this.notificationService.createNotification('success', 'Reservation deleted', 'Reservation was successfully deleted!');
          this.searchData();
        },
        error => this.notificationService.createNotification('error', 'Error!', error.toLocaleString()));
  }


}
