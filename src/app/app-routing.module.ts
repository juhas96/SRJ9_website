import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/register/sign-up/sign-up.component';
import { LogInComponent } from './auth/login/log-in/log-in.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserReservationsComponent } from './pages/user/user-reservations/user-reservations.component';
import { MembersComponent } from './pages/members/members.component';
import { GymReservationComponent } from './pages/gym-reservation/gym-reservation.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'gym_reservation', component: GymReservationComponent, canActivate: [AuthGuard]},
  { path: 'user-reservations', component: UserReservationsComponent, canActivate: [AuthGuard]},
  { path: 'members', component: MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
