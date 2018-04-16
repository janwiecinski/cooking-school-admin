import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from '../app.ingredient.model';
import { IngredientsService } from '../app.ingredients.service';
import { AppIngredientsComponent } from '../app.ingredients.component';
import { FineUploaderBasic } from 'fine-uploader/lib/core';
import { FineUploader, fineUploaderOptions } from 'fine-uploader';
import { environment } from '../../../environments/environment.prod';
import { MsalService } from '../../services/msal.service';

@Component({
    selector: 'dialog-result-example-dialog',
    templateUrl: 'dialog-result-example-dialog.html',
   // styleUrls:['../../node_modules/fine-uploader/fine-uploader/fine-uploader-gallery.css'],
})

export class DialogResultExampleDialog {
    ingredientForm: FormGroup;
    @ViewChild ('fileInput') fileInput;


    constructor(
        public dialogRef: MatDialogRef<DialogResultExampleDialog>,
        private formBuilder: FormBuilder,
        private ingredientsService: IngredientsService,
        private msalService: MsalService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.createForm();
        
    }

    ngOnInit(){
        if(this.data.id == null)
            {
               return;
            }
            else 
                {

                     let uploader = new FineUploader({ 
                        element: document.getElementById("uploader"),
                        template: "qq-template-gallery",
                        request: {
                        customHeaders: {Authorization :`Bearer ` + this.msalService.access_token},
                        endpoint: environment.apiUrl + `/ingredients/${this.data.id}/images`},
                   });
                   
                }

        
       
    }

    createForm() {
        this.ingredientForm = this.formBuilder.group({
            name: [this.data.name, Validators.required]
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    
}