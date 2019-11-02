import { Component, OnInit } from '@angular/core';
import { GymReservationService } from 'src/app/services/gym-reservation.service';
import { GymReservation } from 'src/app/model/gym.model';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { EditGymReservationComponent } from '../edit-gym-reservation/edit-gym-reservation.component';
import { DataService } from 'src/app/services/data.service';
import {GymReservationComponent} from '../../../pages/gym-reservation/gym-reservation.component';
import {NotificationService} from '../../../services/notification.service';


@Component({
  selector: 'app-gym-table',
  templateUrl: './gym-table.component.html',
  styleUrls: ['./gym-table.component.css']
})
export class GymTableComponent implements OnInit {

  searchValue = '';
  data: GymReservation[] = [];
  reservationForEdit: GymReservation;
  listOfDisplayData: GymReservation[] = [];
  loading = true;
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfAvailableGyms = [{ text: 'T1', value: '1' }, { text: 'T2', value: '2' }];
  selectedGymNumber: string;

  constructor(private gymReservationService: GymReservationService,
              private modalService: NzModalService,
              private notificationService: NotificationService) {}

  reset(): void {
    this.searchValue = '';
    this.listOfDisplayData = this.data;
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }

  filterGymChange(value: string): void {
    this.selectedGymNumber = value;
    this.filterData();
  }

  search(): void {
      this.listOfDisplayData = this.data.filter(reservation => reservation.user &&
                                                reservation.user.email === this.searchValue + '@student.tuke.sk');
  }

  filterData() {
      this.listOfDisplayData = this.data.filter(reservation => reservation.gym_number.toString() === this.selectedGymNumber);
  }

  ngOnInit(): void {
    this.searchData();
  }

  searchData() {
    this.loading = true;
    this.gymReservationService
      .getReservations()
      .subscribe(
        (res) => {this.data = res; this.listOfDisplayData = this.data; },
        (err) => console.log(err),
        () => this.loading = false
      );
  }

  createComponentModal(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: GymReservationComponent,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: '80%'
    });
  }

  deleteReservation(id: number, gymReservation: GymReservation) {
    gymReservation.user = null;
    gymReservation.status = 'FREE';
    console.log(gymReservation);
    this.gymReservationService.updateGymReservation(id, gymReservation).subscribe(
        () => this.notificationService.createNotification('success', 'Reservation deleted', 'Reservation was successfully deleted!'),
        error => this.notificationService.createNotification('error', 'Error!', error.toLocaleString()));
  }

  parseNameFromEmail(reservation: GymReservation): string {
      if (reservation.user) {
          return reservation.user.email.slice(0, reservation.user.email.indexOf('@'));
      } else {
          return '';
      }
  }
}
