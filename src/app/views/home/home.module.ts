import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';

@NgModule({
  declarations: [HomeComponent, ProjectsListComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
