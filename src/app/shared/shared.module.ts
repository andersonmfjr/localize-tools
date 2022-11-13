import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    ClipboardModule,
    ScrollingModule,
  ],
  exports: [
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    LottieModule,
    AntModule,
    ClipboardModule,
    ScrollingModule,
    EmptyComponent,
    PageContainerComponent,
    BackButtonComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
