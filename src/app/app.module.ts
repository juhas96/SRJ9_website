import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GymComponent } from './gym/gym.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LaundryComponent } from './laundry/laundry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './event/event.component';
import { MembersComponent } from './members/members.component';
import { FlexModule } from '@angular/flex-layout';
import { CdkModule } from './cdk.module';
import {HttpClientModule} from '@angular/common/http';
import { CheckExistingLaundryReservationComponent } from './laundry/check-existing-laundry-reservation/check-existing-laundry-reservation.component';
import { LaundryChooseComponent } from './laundry/laundry-choose/laundry-choose.component';
import { LaundryTableComponent } from './laundry/laundry-table/laundry-table.component';
import { LaundryTableRowComponent } from './laundry/laundry-table-row/laundry-table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GymComponent,
    LaundryComponent,
    EventComponent,
    MembersComponent,
    CheckExistingLaundryReservationComponent,
    LaundryChooseComponent,
    LaundryTableComponent,
    LaundryTableRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CdkModule,
    FormsModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FlexModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
