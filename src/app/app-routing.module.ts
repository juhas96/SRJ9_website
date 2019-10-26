import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/register/sign-up/sign-up.component';
import { LogInComponent } from './auth/login/log-in/log-in.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { GymReservationComponent } from './pages/gym-reservation/gym-reservation.component';


const routes: Routes = [
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'admin/dashboard', component: DashboardComponent},
  { path: 'gym_reservation', component: GymReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
