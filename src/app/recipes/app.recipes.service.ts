import { Injectable } from '@angular/core';
import { Recipe } from './app.recipe.model';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment.prod';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { ResponseType } from '@angular/http/src/enums';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Injectable()
export class RecipesService{
    recipe: Recipe;
    constructor (private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService){}

    getRecipes(): Promise<Array<Recipe>>{
        this.spinnerService.show();
        return this.http
        .get(environment.apiUrl + '/recipes')
        .toPromise()
        .then((response) =>{
            this.spinnerService.hide();
            return response as Recipe[];
        })
        .catch(this.handleError);

    }

    getRecipe(id): Promise<Recipe>{
        
        return this.http.get(environment.apiUrl + '/recipes/'+ id)
                .toPromise()
                .then(response =>{ return this.recipe = response as Recipe}) 
                .catch(this.handleError);
    }

    deleteRecipe(id): Promise<void>{
        return this.http.delete(environment.apiUrl + '/recipes/' + id)
                .toPromise()
                .then(response => response)
                .catch(this.handleError);
    }

    createRecipe(data): Promise<any>{
        console.log(data);
        debugger;
        return this.http.post(environment.apiUrl +'/recipes', data)
                .toPromise()
                .then(response =>response)
                .catch(this.handleError);
    }

    updateRecipe(data): Promise<void>{
        console.log(data);
        debugger;
        return this.http.put(environment.apiUrl + '/recipes/', data )
        .toPromise()
        .then(res=>{console.log(res)})
        .catch(this.handleError);

    }

     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}