import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/register/sign-up/sign-up.component';
import { LogInComponent } from './auth/login/log-in/log-in.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserReservationsComponent } from './pages/user/user-reservations/user-reservations.component';
import { GymReservationComponent } from './pages/gym-reservation/gym-reservation.component';
import { AuthGuard} from './auth.guard';
import { UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import { SuccessfullLoginComponent} from './pages/successfull-login/successfull-login.component';
import { SuccessfullRegistrationComponent} from './pages/successfull-registration/successfull-registration.component';
import { HomeComponent} from './pages/home/home.component';
import { PublicGymReservationComponent} from './pages/public-gym-reservation/public-gym-reservation.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'gym_reservation', component: GymReservationComponent, canActivate: [AuthGuard]},
  { path: 'user-reservations', component: UserReservationsComponent, canActivate: [AuthGuard]},
  { path: 'welcome-page', component: SuccessfullLoginComponent, canActivate: [AuthGuard]},
  { path: 'successfull-registration', component: SuccessfullRegistrationComponent},
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'public_reservations', component: PublicGymReservationComponent}
  // { path: 'home', component: HomeComponent}
  // { path: 'members', component: MembersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
