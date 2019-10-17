import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';

const nz = [
  NzLayoutModule,
  NzFormModule,
  NzGridModule,
  NzMenuModule,
  NzTableModule,
  NzCardModule
];

@NgModule({
  imports: [nz],
  exports: [nz]
})

export class NzModule {}