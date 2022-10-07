import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { CreateProjectRoutingModule } from './views/create-project/create-project-routing.module';

import { HomeRoutingModule } from './views/home/home-routing.module';

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
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
