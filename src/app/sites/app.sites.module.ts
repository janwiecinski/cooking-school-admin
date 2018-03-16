import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppSitesComponent } from './app.sites.component';


@NgModule({
  declarations: [
    AppSitesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppSitesComponent]
})
export class AppSitesModule { }
