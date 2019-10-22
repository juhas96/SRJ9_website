import { Component, OnInit } from '@angular/core';
import { GymReservationService } from 'src/app/services/gym-reservation.service';
import { GymReservation } from 'src/app/model/gym.model';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { EditGymReservationComponent } from '../edit-gym-reservation/edit-gym-reservation.component';

@Component({
  selector: 'app-gym-table',
  templateUrl: './gym-table.component.html',
  styleUrls: ['./gym-table.component.css']
})
export class GymTableComponent implements OnInit {

  tplModal: NzModalRef;
  htmlModalVisible = false;
  searchValue = '';
  data: GymReservation[] = [];
  reservationForEdit: GymReservation;
  loading = true;
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfSearchAddress: string[] = [];

  constructor(private gymReservationService: GymReservationService, private modalService: NzModalService){}

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.listOfSearchAddress = value;
    this.search();
  }

  search(): void {
    const filterFunc = (item: { name: string; age: number; address: string }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
          : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
    // const data = this.listOfData.filter((item: { name: string; age: number; address: string }) => filterFunc(item));
    // this.listOfDisplayData = data.sort((a, b) =>
    //   this.sortValue === 'ascend'
    //     ? a[this.sortName!] > b[this.sortName!]
    //       ? 1
    //       : -1
    //     : b[this.sortName!] > a[this.sortName!]
    //     ? 1
    //     : -1
    // );
  }

  editReservation() {
    console.log('edit');
  }

  ngOnInit(): void {
    this.searchData();
  }

  searchData() {
    this.loading = true;
    this.gymReservationService
      .getReservations()
      .subscribe(
        (res) => this.data = res,
        (err) => console.log(err),
        () => this.loading = false
      );
  }

  createComponentModal(id: number): void {
    this.reservationForEdit = this.data.find(item => item.id === id);
    const modal = this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: EditGymReservationComponent,
      nzWrapClassName: 'vertical-center-modal',
      // nzComponentParams: {
      //   title: 'title in component',
      //   subtitle: 'component sub title，will be changed after 2 sec'
      // },
      // nzFooter: [
      //   {
      //     label: 'change component title from outside',
      //     onClick: componentInstance => {
      //       componentInstance!.title = 'title in inner component is changed';
      //     }
      //   }
      // ]
    });
  }

  deleteReservation(id: number) {
    this.gymReservationService.deleteGymReservation(id);
    // const itemIndex = this.data.findIndex(obj => obj[idColumn] === id);
    // this.data.splice(itemIndex, 1);
  }
}
