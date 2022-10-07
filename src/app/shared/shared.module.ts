import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyComponent, PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { LottieModule } from 'ngx-lottie';
import { FormsModule } from '@angular/forms';

import player from 'lottie-web';
import { AntModule } from './ant.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, EmptyComponent],
  imports: [
    CommonModule,
    FormsModule,
    AntModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    WebviewDirective,
    FormsModule,
    LottieModule,
    AntModule,
    EmptyComponent,
  ],
})
export class SharedModule {}
