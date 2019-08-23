import { NgModule } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

const cdk = [
  ScrollingModule
];

@NgModule({
  imports: [cdk],
  exports: [cdk]
})

export class CdkModule {}
