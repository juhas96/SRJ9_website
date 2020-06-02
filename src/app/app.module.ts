import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FacebookModule } from 'ngx-facebook';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {en_US, NgZorroAntdModule, NZ_I18N, sk_SK} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import sk from '@angular/common/locales/sk';
import { SignUpComponent } from './auth/register/sign-up/sign-up.component';
import { LogInComponent } from './auth/login/log-in/log-in.component';
import { HomeComponent } from './pages/home/home.component';
import { GymReservationComponent } from './pages/gym-reservation/gym-reservation.component';
import { NzModule } from './nz.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { GymTableComponent } from './components/admin/gym-table/gym-table.component';
import { CardComponent } from './components/admin/card/card.component';
import { EditGymReservationComponent } from './components/admin/edit-gym-reservation/edit-gym-reservation.component';
import { UserReservationsComponent } from './pages/user/user-reservations/user-reservations.component';
import { MembersComponent } from './pages/members/members.component';
import { ReservationTableComponent } from './components/user/reservation-table/reservation-table.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import { SearchInputComponent } from './components/admin/search-input/search-input.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { SuccessfullLoginComponent } from './pages/successfull-login/successfull-login.component';
import { SuccessfullRegistrationComponent } from './pages/successfull-registration/successfull-registration.component';
import { CookieService } from 'ngx-cookie-service';
import { PublicGymReservationComponent } from './pages/public-gym-reservation/public-gym-reservation.component';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule } from 'angular-calendar';
import { LaundryReservationComponent } from './pages/laundry-reservation/laundry-reservation.component';
import {SettingsComponent} from './pages/settings/settings.component';
import { RoomReservationsComponent } from './pages/room-reservations/room-reservations.component';
import {FlexModule} from '@angular/flex-layout';

registerLocaleData(sk);

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    HomeComponent,
    GymReservationComponent,
    DashboardComponent,
    GymTableComponent,
    CardComponent,
    EditGymReservationComponent,
    UserReservationsComponent,
    MembersComponent,
    ReservationTableComponent,
    SearchInputComponent,
    UnauthorizedComponent,
    SuccessfullLoginComponent,
    SuccessfullRegistrationComponent,
    PublicGymReservationComponent,
    SettingsComponent,
    LaundryReservationComponent,
    RoomReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FlexModule
  ],
  providers: [{ provide: NZ_I18N, useValue: sk_SK },
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              AuthService, AuthGuard, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [EditGymReservationComponent]
})
export class AppModule { }
