import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/register/sign-up/sign-up.component';
import { LogInComponent } from './auth/login/log-in/log-in.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserReservationsComponent } from './pages/user/user-reservations/user-reservations.component';
import { MembersComponent } from './pages/members/members.component';


const routes: Routes = [
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'admin/dashboard', component: DashboardComponent},
  { path: 'user-reservations', component: UserReservationsComponent},
  { path: 'members', component: MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
