import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule {}
