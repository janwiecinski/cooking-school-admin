import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsService } from './app.authors.service';
import { OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Author } from "./app.author.model";
import { MatSort, MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { AppAuthorDialog } from "./dialog/app.author.dialog";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { Headers, Http, Response } from '@angular/http';
import { resetFakeAsyncZone } from '@angular/core/testing';


@Component({
  selector: 'app-authors',
  templateUrl: './app.authors.component.html',
  styleUrls: ['./app.authors.component.css']
})
export class AppAuthorsComponent implements OnInit {
  displayedColumns = ['Id', 'Name', 'Surname', 'Age', 'City', 'Job', 'Actions'];
  dataSource:  MatTableDataSource<Author>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataAuthor;
  author: Author;
  id: number = null;

constructor( private authorsService : AuthorsService,  public dialog: MatDialog, public toastr: ToastsManager, vcr: ViewContainerRef){
  this.toastr.setRootViewContainerRef(vcr);
}

ngOnInit(): void {
    this.authorsService.getAuthors().then(response => {
    this.dataAuthor = response;
    this.setPaginator(this.dataAuthor);
  });
}

setPaginator(data) {
  
  this.dataSource = new MatTableDataSource(data);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
}

addAuthor(name, surname, age, job, city):void {
  
  this.authorsService.create(name, surname, age, city, job)
    .then(res => {
      this.dataAuthor.push(res); 
      this.ngOnInit();
      this.showSuccess('Your author ' + name +' '+ surname +' Has Been Added');
    });
    
}

deleteAuthor(author): void {
  this.authorsService.delete(author.Id)
  .then( response =>{this.dataAuthor = this.dataAuthor.filter(h => h !== author);
    this.ngOnInit();
    this.showWarning("You Have Deleted Author " + author.Name + ' '+ author.Surname)
  })
  .catch(response => {
    if (response.status == 409) {
      var authorName = this.dataAuthor.find(f => f.id == author.id).name;
      this.showError("Cannot remove <b>" + authorName + "</b> because it is used in recipies.");
    }
    else {
      this.showError("Internal server error. Try again later.");
    }
  });
}

saveAuthor(id, name, surname, age, job, city): void{
 debugger;
  var newAuthor = {id, name, surname, age, job, city};
  this.authorsService.update(newAuthor)
  .then(()=>{this.ngOnInit();
   this.showSuccess('Your author has been saved '+ newAuthor.name + ' '+ newAuthor.surname);
  })
}

openDialog() {
  let config = new MatDialogConfig();
  config =
    {
      hasBackdrop: true,
      width: 'auto',
      data: {
        dialogType: 'add',
        name: '',
        surname:'',
        job:'',
        city:'',
        age:''
      }
    }
  let dialogRef = this.dialog.open(AppAuthorDialog, config);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.addAuthor( result.name, result.surname, result.age, result.job, result.city);
    }
  })
};

openEditDialog(idToPass)
{
 this.id = idToPass;
 
 this.authorsService.getAuthor(this.id)
 .then(
   author =>{
    let config = new MatDialogConfig();
    config = {
      hasBackdrop: true,
      width: 'auto',
      data: {
        dialogType: 'edit',
        id:author.Id,
        name: author.Name,
        surname:author.Surname,
        job:author.Job,
        city:author.City,
        age:author.Age
       }
       
     };
     console.log(author.Age);
     let dialogRef = this.dialog.open(AppAuthorDialog, config);

     dialogRef.afterClosed().subscribe( result =>{
       if(result === undefined)
        {
          return;
        }
        else{
          this.saveAuthor(this.id, result.name, result.surname, result.age, result.job, result.city);
        }
     }

     )
   }
 )

 

};
showSuccess(text) {
  this.toastr.success(text, null,
    {

    });
}

showError(text) {
  this.toastr.error(text, 'Oops!', { enableHTML: true });
}

showWarning(text) {
  this.toastr.warning(text, 'Author', { enableHTML: true });
}

showInfo() {
  this.toastr.info('Just some information for you.');
}

showCustom() {
  this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
}

}