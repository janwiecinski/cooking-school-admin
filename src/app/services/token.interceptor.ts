// import {Injectable, Injector, NgModule} from '@angular/core'
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { Observable } from "rxjs/Observable";

// @Injectable()

// export class TokenInterceptor implements HttpInterceptor{

//     constructor (private injector : Injector){}

//     intercept (request: HttpRequest<any>, next: HttpHandler): 
//     Observable<HttpEvent<any>>{
//         //this.injector.get(MsalService)
//         request = request.clone({
//             setHeaders:{
//                 Authorization: `Bearer abc`
//             }
//         });

//         return next.handle(request);
//     }

// }
