import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjectRoutingModule } from './edit-project-routing.module';
import { EditProjectFormComponent } from './components/edit-project-form/edit-project-form.component';
import { SharedModule } from '../../shared/shared.module';
import { EditProjectComponent } from './edit-project.component';

@NgModule({
  declarations: [EditProjectComponent, EditProjectFormComponent],
  imports: [CommonModule, EditProjectRoutingModule, SharedModule],
})
export class EditProjectModule {}
