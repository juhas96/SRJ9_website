import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatListModule
];

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule {}
