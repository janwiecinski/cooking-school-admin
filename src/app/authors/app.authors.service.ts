import { Injectable, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from './app.author.model';
import { Headers, Http, Response } from '@angular/http';
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { environment } from '../../environments/environment.prod';
import "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { resetFakeAsyncZone } from '@angular/core/testing';



@Injectable()
export class AuthorsService {

    private authorsUrl = environment.apiUrl +'/authors';
    private localUrl = "http://localhost/cookingschool/api/authors";
    id: object;
    theAuthor: Author;
    constructor(private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService) {  }
    
    getAuthors(): Promise<Array<Author>> {
        this.spinnerService.show()
        return this.http
            .get(this.authorsUrl)
            .toPromise()
            .then((response) => {
                this.spinnerService.hide()
                return response as Author[];
            }
        )
            .catch(this.handleError);
    }
    getAuthor(id: number): Promise<Author> {
       
        return this.http
            .get(this.authorsUrl + '/' + id)
            .toPromise()
            .then((response) => {return response as Author})
            .catch(this.handleError);
    }

    create(name, surname, age, city, job): Promise<any> {
        name = name.trim();
        surname = surname.trim();
        age = age.trim();
        city = city.trim();
        job = job.trim();
        return  this.http.post(this.authorsUrl, 
             {name, surname, age, city, job})
             .toPromise()
             .then(res  =>res)
             .catch(this.handleError);
    }

    delete(id: number): Promise<any> {
        const url = this.authorsUrl + '/' + id;
        return  this.http.delete(url) 
            .toPromise()
            .then(response =>{
                response;
            } ) 
            .catch(this.handleError);
    }

    update(data): Promise<void> {
        const url = this.authorsUrl;
        return this.http.put(url, data)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
            
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

      
}