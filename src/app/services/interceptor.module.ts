import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalService } from "./msal.service";   


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    constructor(private msalService: MsalService) {
        
    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const dupReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ` + this.msalService.access_token
            }
        });
        return next.handle(dupReq);
        
    }
};

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
        MsalService
    ]
})

export class InterceptorModule { }