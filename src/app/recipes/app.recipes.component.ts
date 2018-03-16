import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesService } from './app.recipes.service';
import { OnInit, ViewChild } from '@angular/core';
import { Recipe } from "./app.recipe.model";
import {  MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';
import { RecipeDialog } from '../recipes/dialog/recipeDialog';

@Component({
  selector: 'app-recipes',
  templateUrl: './app.recipes.component.html',
  styleUrls: ['./app.recipes.component.css']
})
export class AppRecipesComponent {

  recipeForm: FormGroup;
  displayedColumns = ['Id', 'Title', 'Description','Actions'];
  dataSource:  MatTableDataSource<Recipe>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataRecipe;
  recipe: Recipe;
  recipes: Recipe[];
  title: string;

  constructor( private recipesService : RecipesService, public dialog: MatDialog ){
    
  }

  ngOnInit(): void {

    this.recipesService.getRecipes().then(recipes => {this.dataRecipe = recipes;
    this.setDataTable(this.dataRecipe);
    });
  }

  setDataTable(data)
  {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
 getRecipe(id):void{
   this.recipesService.getRecipe(id)
   .then(recipe=>{
     this.recipe = recipe;
     return recipe.Title;
   })
 }
 saveRecipe(recipe):void{
   this.recipesService.updateRecipe(recipe)
   .then(()=>this.ngOnInit());
 }

 addRecipe(recipe):void{
   this.recipesService.createRecipe(recipe)
   .then(id =>this.ngOnInit());
 }
 openDialog(){
  let config = new MatDialogConfig();

  config = {
    hasBackdrop : true,
    width: 'auto',
    data:{
      Title:'',
      Description:''
    }
  }

  let dialogRef = this.dialog.open(RecipeDialog, config);

  dialogRef.afterClosed().subscribe(result =>{
    if(result)
    {
      this.addRecipe(result);
    }
  })

 }
}
