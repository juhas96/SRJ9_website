import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {StateService} from '../../services/state.service';
import {RoomReservationStatus} from '../../enums/room-reservation-status.enum';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  futureDate: Date;
  futureDateString: string;
  counter$: Observable<number>;
  subscription: Subscription;
  message: string;
  state;

  constructor(private stateService: StateService, elm: ElementRef) {
    this.stateService.observable.subscribe(res => this.state = res);
    this.futureDateString = elm.nativeElement.getAttribute('inputDate');
  }

  dhms(t) {
    let days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      days + 'd',
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }

  ngOnInit() {
    this.futureDate = new Date(this.futureDateString);
    this.counter$ = interval(1000).pipe(
        map((x) => {
          return Math.floor((this.futureDate.getTime() - new Date().getTime()) / 1000);
        })
    );
    this.subscription = this.counter$.subscribe((x) => {
      this.message = this.dhms(x);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
