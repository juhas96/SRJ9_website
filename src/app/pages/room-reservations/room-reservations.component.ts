import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {RoomReservationsService} from '../../services/room-reservations.service';
import {map} from 'rxjs/operators';
import {Room} from '../../model/room.model';
import {Block} from '../../model/block.model';
import {RoomDropdown} from '../../model/room-dropdown.model';
import {Floor} from '../../model/floor.model';
import {NzCascaderOption} from 'ng-zorro-antd';
import {StateService} from '../../services/state.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css']
})
export class RoomReservationsComponent implements OnInit {
  form: FormGroup;
  emailValidationPattern = '^[A-Za-z0-9._%+-]+@student.tuke.sk$';
  isLoading = false;
  roomCapacity = 0;
  allRooms: Room[];
  sex = 'M';
  state;
  options: NzCascaderOption[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationService,
              private roomReservationsService: RoomReservationsService,
              private stateService: StateService,
              private loadingService: LoadingService) {
  }

  fillUpRooms() {
    this.options = [
      {
        value: 'A',
        label: 'Blok A',
        children: []
      }
    ];
    this.roomReservationsService.getAllRooms(this.sex).pipe(
        map(arr => {
          return arr.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            } as Room;
          });
        })
    ).subscribe(res => {
      this.allRooms = res;
      console.log('ZMENA', res);
      this.fillDropdownOptions(res);
      this.updateCapacity();
    });
  }

  ngOnInit() {
    this.loadingService.observable.subscribe(res => this.isLoading = res);
    this.roomReservationsService.getRooms().pipe(
        map(arr => {
          return arr.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            } as Room;
          });
        })
    ).subscribe(res => {
      console.log(JSON.stringify(res))
    });
    // this.roomReservationsService.fillDb();
    this.options = [
      {
        value: 'A',
        label: 'Blok A',
        children: []
      }
    ];
    this.roomReservationsService.getAllRooms(this.sex).pipe(
        map(arr => {
          return arr.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            } as Room;
          });
        })
    ).subscribe(res => {
      this.allRooms = res;
      console.log('ZMENA', res);
      this.fillDropdownOptions(res);
      this.updateCapacity();
    });
    this.stateService.observable.subscribe(res => {
      this.state = res;
    });
    this.form = this.fb.group({
      room: ['', [Validators.required]],
      firstUserName: ['', [Validators.required]],
      secondUserName: [''],
      thirdUserName: [''],
      fourthUserName: [''],
      firstUserEmail: ['', [Validators.email, Validators.required, Validators.pattern(this.emailValidationPattern)]],
      secondUserEmail: ['', [
          Validators.email,
          Validators.pattern(this.emailValidationPattern)
      ]],
      thirdUserEmail: ['', [
        Validators.email,
        Validators.pattern(this.emailValidationPattern)
      ]],
      fourthUserEmail: ['', [
        Validators.email,
        Validators.pattern(this.emailValidationPattern)
      ]],
    });
    this.updateValidations();
  }

  submitForm() {
    if (this.form.valid) {
      console.log('VALID');

      // this.isLoading = true;
      // tslint:disable-next-line: forin
      for (const i in this.form.controls) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    } else {
      console.log('INVALID');
    }
  }

  updateValidations() {
    if (this.form.get('secondUserName').value) {
      this.form.get('secondUserEmail')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
      this.form.get('secondUserEmail').updateValueAndValidity();
    } else {
      this.form.get('secondUserEmail').clearValidators();
      this.form.get('secondUserEmail').updateValueAndValidity();
    }

    if (this.form.get('thirdUserName').value) {
      this.form.get('thirdUserEmail')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
      this.form.get('thirdUserEmail').updateValueAndValidity();
    } else {
      this.form.get('thirdUserEmail').clearValidators();
      this.form.get('thirdUserEmail').updateValueAndValidity();
    }

    if (this.form.get('fourthUserName').value) {
      this.form.get('fourthUserEmail')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
      this.form.get('fourthUserEmail').updateValueAndValidity();
    } else {
      this.form.get('fourthUserEmail').clearValidators();
      this.form.get('fourthUserEmail').updateValueAndValidity();
    }

    if (this.roomCapacity >= 3) {
      this.form.get('secondUserName')
          .setValidators(Validators.required);
      this.form.get('secondUserEmail')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);

      this.form.get('thirdUserName')
          .setValidators(Validators.required);
      this.form.get('thirdUserEmail')
          .setValidators([Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
    }
  }

  fillDropdownOptions(rooms: Room[]) {
    const blocksMap: Map<string, Map<string, NzCascaderOption[]>> = new Map<string, Map<string, NzCascaderOption[]>>();
    rooms.forEach(room => {
      if (!blocksMap.has(room.block)) {
        blocksMap.set(room.block, new Map<string, NzCascaderOption[]>());
      }

      const singleBlock = blocksMap.get(room.block);
      if (!singleBlock.has(room.floor.toString())) {
        singleBlock.set(room.floor.toString(), []);
      }

      const singleFloor = singleBlock.get(room.floor.toString());

      singleFloor.push(new RoomDropdown(room.roomNumber, 'Izba č.' + room.roomNumber + ' (' + room.capacity + ')'));
    });

    blocksMap.forEach((floors, blockKey) => {
      const block = new Block(blockKey, 'Blok ' + blockKey);
      const floorsArray = [];

      floors.forEach((floorRooms: RoomDropdown[], floorKey) => {
        const floor = new Floor(floorKey, floorKey + '.poschodie');
        floor.children.push(...floorRooms);
        floorsArray.push(floor);
      });
      console.log(this.options);
      block.children.push(...floorsArray);
      this.options.push(block);
    });
    this.options = this.options.filter(option => option.children.length > 0);
    // Filter for unique blocks
    this.options = Array.from(new Set(this.options.map(a => a.value))).map(x => {
      return this.options.find(a => a.value === x);
    });
    this.options[0].children.sort((a, b) => {
      return a.value < b.value ? -1 : 1;
    });
    this.options[0].children.forEach(floor => {
      floor.children.sort((a, b) => {
        return a.value < b.value ? -1 : 1;
      });
    });
  }

  updateCapacity() {
    const room = this.allRooms
        .find(block => block.block === this.form
            .get('room').value[0] && block.floor == this.form
            .get('room').value[1] && block.roomNumber === this.form
            .get('room').value[2]);
    if (room) {
      this.roomCapacity = room.capacity;
    } else {
      this.roomCapacity = 0;
    }
  }

  reserveRoom() {
    this.loadingService.changeData(true);
    const room = this.allRooms
        .find(block => block.block === this.form
            .get('room').value[0] && block.floor == this.form
            .get('room').value[1] && block.roomNumber === this.form
            .get('room').value[2]);

    let reservedPlaces = 0;
    if (this.form.get('firstUserEmail').value) {
      reservedPlaces += 1;
      room.users.push(this.form.get('firstUserEmail').value);
    }

    if (this.form.get('secondUserEmail').value) {
      reservedPlaces += 1;
      room.users.push(this.form.get('secondUserEmail').value);
    }

    if (this.form.get('thirdUserEmail').value) {
      reservedPlaces += 1;
      room.users.push(this.form.get('thirdUserEmail').value);
    }

    if (this.form.get('fourthUserEmail').value) {
      reservedPlaces += 1;
      room.users.push(this.form.get('fourthUserEmail').value);
    }

    room.capacity = room.capacity - reservedPlaces;
    if (room.capacity === 0) {
      room.isAvailable = false;
    }
    room.sex = this.sex;
    this.roomReservationsService.updateRoom(room, room.id);
  }

  filterRoomsBySex() {
    this.roomCapacity = 0;
    this.form.get('room').patchValue('');
    this.fillUpRooms();
  }
}
