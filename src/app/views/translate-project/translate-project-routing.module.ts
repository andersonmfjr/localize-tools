import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateProjectComponent } from './translate-project.component';

const routes: Routes = [
  {
    path: 'translate-project',
    component: TranslateProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslateProjectRoutingModule {}
