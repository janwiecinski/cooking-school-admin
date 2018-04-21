import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalService } from "./msal.service";   
import { error, debug } from 'util';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private msalService: MsalService) {
        
    };

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any>{
        return req.clone({setHeaders:{Authorization: `Bearer ` +token}})
    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
       
        return  next.handle(this.addToken(req, this.msalService.access_token))
            .catch(e => {
                if (e.status === 401)
                {
                    return  this.handle401Error(req, next);
                }
            })
    }
   handle401Error(req: HttpRequest<any>, next: HttpHandler){
   
        return this.msalService.refreshToken()
        .switchMap((newToken: string) => {
            if (newToken) {
               
                return next.handle(this.addToken(req, newToken));
            }
        })
        .catch(error => {
            // If there is an exception calling 'refreshToken', bad news so logout.
            return this.msalService.logout();
        })
        .finally(() => {
            this.isRefreshingToken = false;
        });
    } 
}

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
        MsalService
    ]
})

export class InterceptorModule { }