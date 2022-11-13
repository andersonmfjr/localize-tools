import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProjectComponent } from './project.component';
import { MissingTranslationsModalComponent } from './components/missing-translations-modal/missing-translations-modal.component';

@NgModule({
  declarations: [ProjectComponent, MissingTranslationsModalComponent],
  imports: [CommonModule, SharedModule, ProjectRoutingModule],
})
export class ProjectModule {}
