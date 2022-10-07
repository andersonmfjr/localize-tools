import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  PlusCircleOutline,
  HomeOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [PlusCircleOutline, HomeOutline];

@NgModule({
  declarations: [],
  imports: [
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzTypographyModule,
    NzBreadCrumbModule,
  ],
  exports: [
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzBreadCrumbModule,
  ],
})
export class AntModule {}
