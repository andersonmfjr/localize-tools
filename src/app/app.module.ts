import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './views/home/home.module';

import { AppComponent } from './app.component';
import { CreateProjectModule } from './views/create-project/create-project.module';
import { ProjectComponent } from './views/project/project.component';
import { EditProjectComponent } from './views/edit-project/edit-project.component';
import { TranslateProjectComponent } from './views/translate-project/translate-project.component';

@NgModule({
  declarations: [AppComponent, ProjectComponent, EditProjectComponent, TranslateProjectComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    CreateProjectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
