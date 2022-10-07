import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProjectRoutingModule } from './create-project-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CreateProjectComponent } from './create-project.component';

@NgModule({
  declarations: [CreateProjectComponent],
  imports: [CommonModule, CreateProjectRoutingModule, SharedModule],
})
export class CreateProjectModule {}
