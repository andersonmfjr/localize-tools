import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProjectComponent } from './project.component';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, SharedModule, ProjectRoutingModule],
})
export class ProjectModule {}
