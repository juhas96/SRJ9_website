import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd';


const nz = [
  NzLayoutModule,
  NzFormModule,
  NzGridModule,
  NzMenuModule,
  NzTableModule,
  NzCardModule,
  NzModalModule,
  NzToolTipModule,
  NzSelectModule,
  NzResultModule,
  NzNotificationModule,
  NzSpinModule,
  NzStepsModule
];

@NgModule({
  imports: [nz],
  exports: [nz]
})

export class NzModule {}
