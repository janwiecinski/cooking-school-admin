import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppIngredientsModule } from './ingredients/app.ingredients.module';
import { AppIngredientsComponent } from './ingredients/app.ingredients.component';
import { AppRecipesModule } from './recipes/app.recipes.module';
import { AppRecipesComponent } from './recipes/app.recipes.component';
import { AppAuthorsModule } from './authors/app.authors.module';
import { AppAuthorsComponent } from './authors/app.authors.component';
import { AppSitesModule } from './sites/app.sites.module';
import { AppSitesComponent } from './sites/app.sites.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound';
import { DialogResultExampleDialog } from './ingredients/dialog/dialog-result.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { InterceptorModule } from "./services/interceptor.module";
import { MsalService } from "./services/msal.service";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    
  ],


  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    InterceptorModule,
    BrowserModule,
    AppRoutingModule,
    AppIngredientsModule,
    AppAuthorsModule,
    AppRecipesModule,
    AppSitesModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
   
  ],
  providers: [ MsalService],

  schemas:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
