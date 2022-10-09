import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  EmptyComponent,
  PageNotFoundComponent,
  PageContainerComponent,
  BackButtonComponent,
  HeaderComponent,
} from './components/';
import { WebviewDirective } from './directives/';
import { LottieModule } from 'ngx-lottie';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { AntModule } from './ant.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    EmptyComponent,
    PageContainerComponent,
    BackButtonComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    LottieModule,
    AntModule,
    EmptyComponent,
    PageContainerComponent,
    BackButtonComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
