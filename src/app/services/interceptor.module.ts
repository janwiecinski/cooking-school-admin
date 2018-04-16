import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalService } from "./msal.service";   
import { error } from 'util';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    constructor(private msalService: MsalService) {
        
    };

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const dupReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ` + this.msalService.access_token
            }
        });
        return  next.handle(dupReq)
            .catch(e => {
                if (e.status === 401)
                {
                    return this.handle401Error(req, next);
                }
            })
    }
   handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    if (!this.isRefreshingToken){
        this.isRefreshingToken = true;

        this.tokenSubject.next(null);

        return this.msalService.refreshToken()
                .switchMap((newToken: string) => {
                    debugger;
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
                    }
                    else{
                        return this.msalService.logout();
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

   addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
}
};

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
        MsalService
    ]
})

export class InterceptorModule { }