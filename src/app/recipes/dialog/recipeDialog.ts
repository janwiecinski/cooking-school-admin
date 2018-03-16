import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recipe } from '../app.recipe.model';
import { RecipesService } from '../app.recipes.service';
import { AppRecipesComponent } from '../app.recipes.component';
import { FineUploaderBasic } from 'fine-uploader/lib/core';
import { FineUploader, UIOptions } from 'fine-uploader';
import { environment } from '../../../environments/environment.prod';


@Component({
    selector: 'recipeDialog',
    templateUrl: './recipeDialog.html',
    
})

export class RecipeDialog {
    recipeForm: FormGroup;
    @ViewChild ('fileInput') fileInput;
    private fineUploaderOptions: UIOptions;

    constructor(
        public dialogRef: MatDialogRef<RecipeDialog>,
        private formBuilder: FormBuilder,
        private recipeService: RecipesService,
        
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.createForm();
        
    }


    createForm() {
        this.recipeForm = this.formBuilder.group({
            Title: [this.data.Title, Validators.required],
            Description: [this.data.Description, Validators.required]
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    
}