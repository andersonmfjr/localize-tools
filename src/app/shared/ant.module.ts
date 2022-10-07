import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { IconDefinition } from '@ant-design/icons-angular';
import { PlusCircleOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [PlusCircleOutline];

@NgModule({
  declarations: [],
  imports: [NzButtonModule, NzIconModule.forRoot(icons), NzTypographyModule],
  exports: [NzButtonModule, NzIconModule, NzTypographyModule],
})
export class AntModule {}
