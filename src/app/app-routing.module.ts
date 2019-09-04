import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {LaundryComponent} from './laundry/laundry.component';
import {HomeComponent} from './home/home.component';
import {EventComponent} from './event/event.component';
import {MembersComponent} from './members/members.component';
import {GymComponent} from './gym/gym.component';
import {LaundryChooseComponent} from './laundry/laundry-choose/laundry-choose.component';
import {CheckExistingLaundryReservationComponent} from './laundry/check-existing-laundry-reservation/check-existing-laundry-reservation.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'laundry', component: LaundryChooseComponent },
    { path: 'events', component: EventComponent },
    { path: 'members', component: MembersComponent },
    { path: 'gym', component: GymComponent },
    { path: 'create-laundry-reservation', component: LaundryComponent },
    { path: 'check-existing-laundry-reservation', component: CheckExistingLaundryReservationComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
