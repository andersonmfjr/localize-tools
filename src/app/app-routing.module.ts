import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { CreateProjectRoutingModule } from './views/create-project/create-project-routing.module';
import { EditProjectRoutingModule } from './views/edit-project/edit-project-routing.module';

import { HomeRoutingModule } from './views/home/home-routing.module';
import { ProjectRoutingModule } from './views/project/project-routing.module';
import { TranslateProjectRoutingModule } from './views/translate-project/translate-project-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    CreateProjectRoutingModule,
    EditProjectRoutingModule,
    ProjectRoutingModule,
    TranslateProjectRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
