import { Injectable } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Ingredient } from './app.ingredient.model';
import { environment } from '../../environments/environment.prod';
import { Headers, Http, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/toPromise';
import { Host, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Injectable()
export class IngredientsService {
    private ingredientsUrl = environment.apiUrl + '/ingredients';
    private localUrl = "http://localhost/cookingschool/api/ingredients";

    private ingredient: Ingredient;
    constructor(private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService) { 
    }

    getIngredients(): Promise<Array<Ingredient>> {
        this.spinnerService.show();
        return this.http
            .get(this.localUrl)
            .toPromise()
            .then((response) => {
                this.spinnerService.hide();
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

    create(name: string): Promise<Ingredient> {
        return this.http.post(this.ingredientsUrl,
            { name })
            .toPromise()
            .then(res => res as Ingredient)
            .catch(this.handleError);
    }

    delete(id: number): Promise<any> {
        const url = this.ingredientsUrl + '/' + id;
        return  this.http.delete(url) 
            .toPromise()
            .then(response => response) 
            .catch(this.handleError);
    }

    update(ingredient: Ingredient): Promise<Ingredient> {
        const url = this.ingredientsUrl;
        return this.http.put(url, ingredient)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);

    }
    private handleError(error: any): Promise<any> {

        return Promise.reject(error.message || error);
    }
}