import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RecipeDialog } from '../recipes/dialog/recipeDialog';

import { AppRecipesComponent } from './app.recipes.component';
import { RecipesService } from './app.recipes.service';
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
  MatFormFieldModule,
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
    AppRecipesComponent,
    RecipeDialog
  ],
  imports: [
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
    MatFormFieldModule,
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
    ReactiveFormsModule, 
    FormsModule
    
  ],
  providers: [RecipesService],
  bootstrap: [AppRecipesComponent],
  entryComponents: [RecipeDialog]
})
export class AppRecipesModule { }
