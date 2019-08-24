import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {LaundryComponent} from './laundry/laundry.component';
import {HomeComponent} from './home/home.component';
import {EventComponent} from './event/event.component';
import {MembersComponent} from './members/members.component';
import {GymComponent} from './gym/gym.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'laundry', component: LaundryComponent },
    { path: 'events', component: EventComponent },
    { path: 'members', component: MembersComponent },
    { path: 'gym', component: GymComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
