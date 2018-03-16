import { Injectable } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Ingredient } from './app.ingredient.model';
import { environment } from '../../environments/environment.prod';
import { Headers, Http, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/toPromise';
import { Host, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class IngredientsService {
    private ingredientsUrl = environment.apiUrl + '/ingredients';
    private ingredient: Ingredient;
    constructor(private http: HttpClient) { 
    }

    getIngredients(): Promise<Array<Ingredient>> {
        return this.http
            .get(this.ingredientsUrl)
            .toPromise()
            .then((response) => {
                return response as Ingredient[];
            })
            .catch(this.handleError);

    }

    getIngredient(id: number): Promise<Ingredient> {
        return this.http
            .get(this.ingredientsUrl + '/' + id)
            .toPromise()
            .then((response) => { return response as Ingredient })
            .catch(this.handleError);
    }

    create(name: string): Promise<number> {
        return this.http.post(this.ingredientsUrl,
            { name })
            .toPromise()
            .then(res => res as number)
            .catch(this.handleError);
    }

    delete(id: number): Promise<any> {
        const url = this.ingredientsUrl + '/' + id;
        return  this.http.delete(url) 
            .toPromise()
            .then(response => response) 
            .catch(this.handleError);
    }

    update(ingredient: Ingredient): Promise<void> {
        const url = this.ingredientsUrl;
        return this.http.put(url, ingredient)
            .toPromise()
            .then(response => {this.getIngredients()} )
            .catch(this.handleError);

    }
    private handleError(error: any): Promise<any> {

        return Promise.reject(error.message || error);
    }
}