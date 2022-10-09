import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProjectRoutingModule } from './create-project-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CreateProjectComponent } from './create-project.component';
import { CreateProjectFormComponent } from './components/create-project-form/create-project-form.component';

@NgModule({
  declarations: [CreateProjectComponent, CreateProjectFormComponent],
  imports: [CommonModule, CreateProjectRoutingModule, SharedModule],
})
export class CreateProjectModule {}
