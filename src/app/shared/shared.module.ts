import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { LottieModule } from 'ngx-lottie';
import { FormsModule } from '@angular/forms';

import player from 'lottie-web';
import { MaterialModule } from './material.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [WebviewDirective, FormsModule, MaterialModule, LottieModule],
})
export class SharedModule {}
