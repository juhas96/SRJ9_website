import { Component, OnInit } from '@angular/core';
import { GymReservationService } from 'src/app/services/gym-reservation.service';
import { GymReservation } from 'src/app/model/gym.model';
import { filter } from 'rxjs/operators'
import * as moment from 'moment'


@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.component.html',
  styleUrls: ['./gym-reservation.component.css']
})
export class GymReservationComponent implements OnInit {

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };


  gymTimes = ["21:00 - 21:59", "22:00 - 22:59", "23:00 - 23:59", "00:00 - 00:59"]
  sundayDate = new Date();
  arr:GymReservation[];
  arr2:GymReservation[];
  menic: GymReservation

  

  constructor(private gymService: GymReservationService) {
   }

  ngOnInit() {

    this.gymService.getReservationForCurrentWeek().subscribe(data => {
      //this.arr=data;
      this.arr = data.filter(res => res.id==6 || res.id==33)
      console.log(this.arr);
      
    })

    console.log(moment().day(0).hour(0).minute(0).second(0).millisecond(0).format("YYYY-MM-DDTHH:mm:ss.SSS+0000")) //0 pre nedelu
    console.log(moment().day(2).hour(0).minute(0).second(0).millisecond(0).format("YYYY-MM-DDTHH:mm:ss.SSS+0000")) //2 pre utorok
    console.log(moment().day(4).hour(0).minute(0).second(0).millisecond(0).format("YYYY-MM-DDTHH:mm:ss.SSS+0000")) //4 pre stvrtok

    console.log(moment().day(7).hour(0).minute(0).second(0).millisecond(0).format("YYYY-MM-DDTHH:mm:ss.SSS+0000")) //7 pre buducu nedelu
    console.log(moment().day(9).hour(0).minute(0).second(0).millisecond(0).format("YYYY-MM-DDTHH:mm:ss.SSS+0000")) //9 pre buduci utorok
    console.log(moment().day(11).hour(0).minute(0).second(0).millisecond(0).format("YYYY-MM-DDTHH:mm:ss.SSS+0000")) //11 pre buduci stvrtok
  }


  fk(id){
    this.menic = this.arr.filter(el => el.id==id)[0]
    console.log(this.menic)
    setTimeout( () => { 
      this.menic.status = "zmenene"
    console.log(this.menic)
    }, 1000)
    
  }

}
