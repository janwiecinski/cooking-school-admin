import { Injectable } from '@angular/core';
import {UserAgentApplication} from 'msal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import { promise, error } from 'protractor/node_modules/@types/selenium-webdriver';
import { Promise } from 'protractor/node_modules/@types/q';
import { User } from 'msal/lib-commonjs/User';



@Injectable()
export class MsalService {

  
    access_token : string = null;

    


    constructor(private spinnerService: Ng4LoadingSpinnerService){ }

    tenantConfig = {
        tenant: "CookingSchoolB2CTenant.onmicrosoft.com",
        clientID:  '842ce2f3-7f76-4a3f-97bc-18d5fa948b47',
        signUpSignInPolicy: "B2C_1_FirstPolicy",
        b2cScopes: ["https://CookingSchoolB2CTenant.onmicrosoft.com/trueApi/read https://CookingSchoolB2CTenant.onmicrosoft.com/trueApi/write https://CookingSchoolB2CTenant.onmicrosoft.com/trueApi/delete"],  
        responseType: "id_token",
        post_logout_redirect_uri:"http://localhost:4200/"
    };
    tenantConfigReload = {
        tenant: "CookingSchoolB2CTenant.onmicrosoft.com",
        clientID:  '842ce2f3-7f76-4a3f-97bc-18d5fa948b47',
        signUpSignInPolicy: "B2C_1_FirstPolicy",
        b2cScopes: ["https://CookingSchoolB2CTenant.onmicrosoft.com/trueApi/read https://CookingSchoolB2CTenant.onmicrosoft.com/trueApi/write https://CookingSchoolB2CTenant.onmicrosoft.com/trueApi/delete"],  
        prompt : "none",
        responseType: "id_token",
        nonce:"12345",
        post_logout_redirect_uri:"http://localhost:4200"
    };
    
    // Configure the authority for Azure AD B2C

    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;
    
        /*
         * B2C SignIn SignUp Policy Configuration
         */
        clientApplication = new UserAgentApplication(
            this.tenantConfig.clientID, this.authority, 
            function (errorDesc: any, token: any, error: any, tokenType: any) {
                // Called after loginRedirect or acquireTokenPopup
            }
        );

    
        public login(): void {
         this.spinnerService.show();
           var _this = this;
            this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
                _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                    function (accessToken: any) {
                        _this.access_token = accessToken;
                        _this.spinnerService.hide();
                    }, function (error: any) {
                        _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                            function (accessToken: any) {
                                _this.access_token = accessToken;
                            }, function (error: any) {
                               console.log("Error acquiring the popup:\n" + error);
                            });
                    }
                )
            }, function (error: any) {
                console.log("Error during login:\n" + error);
            });
        }
        
        logout() {
            this.spinnerService.show();
            this.clientApplication.logout();
            this.spinnerService.hide();
            return Observable.throw("");
        };
    
        isOnline(): boolean {
            return this.clientApplication.getUser() != null;  
        };

        refreshToken(): Observable<string>{
                       return Observable.fromPromise(this.clientApplication.acquireTokenSilent(this.tenantConfigReload.b2cScopes)
                        .then(function(accessToken: any){
                            return   accessToken ;
                        }));
                        
            };
                      
                        
    }
    