import { Component, ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsService } from './app.ingredients.service';
import { OnInit, Injectable, OnChanges, Inject } from '@angular/core';
import { Ingredient } from './app.ingredient.model';
import { Headers, Http, Response } from '@angular/http';
import { MatDialog, MatDialogRef, MatDialogConfig, MatTooltipModule, MatSort, Sort } from '@angular/material';
import { DialogResultExampleDialog } from './dialog/dialog-result.component';
import { MatTableModule, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from './../../environments/environment.prod';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FineUploader } from 'fine-uploader';

@Component({

  selector: 'app-ingredients',
  templateUrl: './app.ingredients.component.html',
  styleUrls: ['./app.ingredients.component.css'],

})

export class AppIngredientsComponent {


  title = 'app';
  ingredients: Ingredient[];
  pagedIngredients: Ingredient[];
  ingredient: Ingredient;
  id: number = null;
  length;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent: PageEvent;
  sortedData;

  constructor(private ingredientsService: IngredientsService, public dialog: MatDialog, public toastr: ToastsManager, vcr: ViewContainerRef, private spinnerService: Ng4LoadingSpinnerService) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit(): void {

    this.ingredientsService.getIngredients().then(ingredients => {
      this.ingredients = ingredients;
      this.length = this.ingredients.length;
      this.pagedIngredients = this.ingredients.slice(0, this.pageSize);

    });

  }

  getSortedData(sort: Sort): Ingredient[] {

    const data = this.ingredients.slice();
    if (!sort.active || sort.direction == '')
    { this.sortedData = data; return; }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Id': return compare(a.Id, b.Id, isAsc);
        case 'Name': return compare(a.Name, b.Name, isAsc);
      }
    });
    this.ingredients = this.sortedData;
    this.length = this.ingredients.length;
    this.sortedData = this.ingredients;
    this.pagedIngredients = this.sortedData.slice(0, this.pageSize);
  }

  getImageUrl(imageId) {
    return `${environment.apiUrl}/images/${imageId}/thumbnail?width=60&height=60`;
  }

  onPaginateChange(event) {
    var startIndex = event.pageIndex * event.pageSize;
    var endIndex = startIndex + event.pageSize;
    this.pagedIngredients = this.ingredients.slice(startIndex, endIndex);
  }

  addIngredient(name: string): void {

    name = name.trim();
    this.ingredientsService.create(name)
      .then(id => {

        this.ingredients.push(new Ingredient(id, name, null));
        this.toastr.success('Your Ingredient Has Been Added', null,
          {
            toastLife: 10000,
            showCloseButton: true,
            messageClass: 'toastrIngredientSucces'
          });
      });
  }

  deleteIngredient(ingredient: Ingredient): void {

    this.ingredientsService.delete(ingredient.Id)
      .then(response => {

        this.ingredients = this.ingredients.filter(h => h !== ingredient);
        this.showSuccess(response._body);
      })
      .catch(response => {
        if (response.status == 409) {
          var ingredientName = this.ingredients.find(f => f.Id == ingredient.Id).Name;
          this.showError("Cannot remove <b>" + ingredientName + "</b> because it is used in recipies.");
        }
        else {
          this.showError("Internal server error. Try again later.");
        }
      })
  }
  saveIngredient(id, newName) {

    var ingredient = new Ingredient(id, newName, null);
    this.ingredientsService.update(ingredient)
      .then(() => {
        this.ngOnInit();

        this.showSuccess('Your ingredient has been saved');
      });

  }
  openDialog() {
    let config = new MatDialogConfig();
    config =
      {
        hasBackdrop: true,
        width: 'auto',
        data: {
          dialogType: 'add',
          name: ''
        }
      }
    let dialogRef = this.dialog.open(DialogResultExampleDialog, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addIngredient(result.name);
      }
    }
    )
  };

  openEditDialog(idToPass): void {

    this.id = idToPass;
    this.ingredientsService.getIngredient(this.id)
      .then(ingredient => {
        let config = new MatDialogConfig();
        config =
          {
            hasBackdrop: true,
            width: 'auto',
            data: {
              dialogType: 'edit',
              name: ingredient.Name,
              id: ingredient.Id
            }
          };
        let dialogRef = this.dialog.open(DialogResultExampleDialog, config);

        dialogRef.afterClosed().subscribe(result => {
          if (result === undefined) {
            return;
          }
          else {
            this.saveIngredient(this.id, result.name);
          }
        });
      });
  }
  showSuccess(text) {
    this.toastr.success(text, null,
      {

      });
  }

  showError(text) {
    this.toastr.error(text, 'Oops!', { enableHTML: true });
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }

}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}