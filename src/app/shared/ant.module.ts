import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {
  PlusCircleOutline,
  HomeOutline,
  UploadOutline,
  QuestionCircleFill,
  QuestionOutline,
  QuestionCircleOutline,
  MinusCircleOutline,
  PlusOutline,
  DeleteOutline,
  TranslationOutline,
  AlertOutline,
  DeleteRowOutline,
  SwapOutline,
  StopOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  DeleteRowOutline,
  SwapOutline,
  PlusOutline,
  PlusCircleOutline,
  HomeOutline,
  UploadOutline,
  QuestionCircleFill,
  QuestionOutline,
  QuestionCircleOutline,
  MinusCircleOutline,
  DeleteOutline,
  TranslationOutline,
  AlertOutline,
  StopOutline,
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
    NzMessageModule,
    NzCardModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzModalModule,
    NzTabsModule,
    ScrollingModule,
    NzListModule,
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
    NzMessageModule,
    NzCardModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzModalModule,
    NzTabsModule,
    ScrollingModule,
    NzListModule,
  ],
})
export class AntModule {}
