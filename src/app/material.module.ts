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
  MatListModule,
  MatRadioModule,
  MatDialogModule,
  MatTableModule,
  MatCheckboxModule
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
  MatListModule,
  MatRadioModule,
  MatDialogModule,
  MatTableModule,
  MatCheckboxModule
];

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule {}
