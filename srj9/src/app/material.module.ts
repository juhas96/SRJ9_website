import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonToggleModule,
  MatStepperModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonToggleModule,
  MatStepperModule
];

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule {}
