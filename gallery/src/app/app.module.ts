import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent }
    ]),
    BrowserAnimationsModule,
    GalleryModule,
    LightboxModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
