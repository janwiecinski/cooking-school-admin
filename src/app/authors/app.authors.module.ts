import { AuthorsService } from './app.authors.service';
import { AppAuthorsComponent } from './app.authors.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppAuthorDialog} from './dialog/app.author.dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import{
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  } from '@angular/material';

@NgModule({
  declarations: [
    AppAuthorsComponent,
    AppAuthorDialog
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    
  ],

  providers: [AuthorsService],
  bootstrap: [AppAuthorsComponent , AppAuthorDialog]
})
export class AppAuthorsModule { }
