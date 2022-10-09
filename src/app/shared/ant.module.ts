import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {
  PlusCircleOutline,
  HomeOutline,
  UploadOutline,
  QuestionCircleFill,
  QuestionOutline,
  QuestionCircleOutline,
  MinusCircleOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  PlusOutline,
  PlusCircleOutline,
  HomeOutline,
  UploadOutline,
  QuestionCircleFill,
  QuestionOutline,
  QuestionCircleOutline,
  MinusCircleOutline,
];

@NgModule({
  declarations: [],
  imports: [
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzTypographyModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    NzToolTipModule,
    NzCheckboxModule,
  ],
  exports: [
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    NzToolTipModule,
    NzCheckboxModule,
  ],
})
export class AntModule {}
