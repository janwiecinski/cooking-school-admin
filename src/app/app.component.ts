import { Component } from '@angular/core';
import { Location }     from '@angular/common';
import { MsalService } from "./services/msal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
  
})

export class AppComponent {
  title = 'app';

  constructor(
    private location: Location,
    private msalService: MsalService
  ) { }


  login(): void {
    this.msalService.login();
  }

  logout(): void{
    this.msalService.logout();
  }

  isOnline(): boolean {
    return this.msalService.isOnline();
  }

  isActive(viewLocation: any): boolean {        
    return viewLocation === this.location.path();
};
}
