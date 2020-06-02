import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomReservationsService {

  constructor(private firestore: AngularFirestore) { }

  getAllRooms() {
    return this.firestore.collection('rooms', ref => {
      return ref.where('capacity', '>', 0);
    }).snapshotChanges();
  }

  updateRoom(data) {
    return this.firestore.collection('rooms')
        .doc(data.payload.doc.id)
        .set(data, {merge: true});
  }
}
