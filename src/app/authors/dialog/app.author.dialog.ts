import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Author } from '../app.author.model';
import { AuthorsService } from '../app.authors.service';
import { AppAuthorsComponent } from '../app.authors.component';
import { environment } from '../../../environments/environment.prod';

@Component({
    selector: 'app-author-dialog',
    templateUrl: 'app.author.dialog.html',
    
})


export class AppAuthorDialog {
    authorForm: FormGroup;
    @ViewChild ('fileInput') fileInput;

    constructor(
        public dialogRef: MatDialogRef<AppAuthorDialog>,
        private formBuilder: FormBuilder,
        private authorsService: AuthorsService,
        
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.createForm();
        
    }

    createForm() {
        this.authorForm = this.formBuilder.group({
            name: [this.data.name, Validators.required],
            surname:[this.data.surname, Validators.required],
            age:[this.data.age, Validators.required],
            job:[this.data.job, Validators.required],
            city:[this.data.city, Validators.required],
            
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
