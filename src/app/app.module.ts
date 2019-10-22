import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, sk_SK } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    EditGymReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: sk_SK }, AuthService, AuthGuard, ],
  bootstrap: [AppComponent],
  entryComponents: [EditGymReservationComponent]
})
export class AppModule { }
