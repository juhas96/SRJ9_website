import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Room} from '../model/room.model';
import {NotificationService} from './notification.service';
import {LoadingService} from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class RoomReservationsService {

  constructor(private db: AngularFirestore,
              private notificationService: NotificationService,
              private loadingService: LoadingService) { }

  getAllRooms(filterBy: string) {
    return this.db.collection('rooms', ref => {
      return ref.where('capacity', '>', 0).where('sex', 'in', [filterBy, 'W']);
    }).snapshotChanges();
  }

  // fillDb() {
  //     const rooms = [];
  //     for (let floor = 1; floor < 8; floor++) {
  //         for (let room = 1; room < 14; room++) {
  //               if (room !== 7) {
  //                   const newRoom = new Room();
  //                   newRoom.users = [];
  //                   newRoom.floor = floor;
  //                   newRoom.block = 'A';
  //                   if (room < 10) {
  //                       newRoom.roomNumber = floor.toString() + '0' + room.toString();
  //                   } else {
  //                       newRoom.roomNumber = floor.toString() + room.toString();
  //                   }
  //                   newRoom.isAvailable = true;
  //                   newRoom.capacity = 4;
  //                   newRoom.sex = 'M';
  //                   this.db.firestore.collection('rooms').add({...newRoom}).then(res => {}, err => console.log(err));
  //               }
  //           }
  //       }
  //     console.log(rooms);
  //   }

  updateRoom(room: Room, id) {
    const singleRoomRef = this.db.firestore.collection('rooms').doc(id);

    this.db.firestore.runTransaction(transaction =>
        transaction.get(singleRoomRef)
            .then(roomRef => {
              if (roomRef.data().isAvailable === true) {
                transaction.update(singleRoomRef, room);
              } else {
                console.log('Transaction failed because somebody else reserved room');
                this.notificationService.createNotification('error', 'Chyba', 'Niekto si pravdepodobne túto izbu rezervoval skôr ako ty.');
                  this.loadingService.changeData(false);
                return Promise.reject('Sorry! Somebody reserved room ');
              }
            })).then(() => {
                this.notificationService.createNotification('success', 'Výborne', 'Rezervácia na zvolenú izbu bola vytvorená');
                this.loadingService.changeData(false);
                console.log('Transaction successfully committed!');
          })
        .catch(error => {
            this.notificationService.createNotification('error', 'Chyba', 'Niekto si pravdepodobne túto izbu rezervoval skôr ako ty.');
            this.loadingService.changeData(false);
            console.log('Transaction failed: ', error);
        });
  }
}
