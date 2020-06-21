import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { GymReservation } from 'src/app/model/gym.model';
import { GymReservationService } from 'src/app/services/gym-reservation.service';
import {NotificationService} from '../../../services/notification.service';
import {CookieService} from 'ngx-cookie-service';
import {text} from '../../../texts/constants';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {


  @Output()
  happened: EventEmitter<any> = new EventEmitter<any>();

  data: GymReservation[] = [];
  loading = true;
  txt = text;

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
    this.gymReservationService.update(id, gymReservation).subscribe(
        () => {
          this.notificationService.createNotification('success',
              this.txt.gymTable.reservationDeleted,
              this.txt.gymTable.reservationDeletedDesc);
          this.searchData();
        },
        error => this.notificationService.createNotification('error', 'Error!', error.toLocaleString()));
  }

  happ(event) {
    this.happened.emit(event);
  }


}
