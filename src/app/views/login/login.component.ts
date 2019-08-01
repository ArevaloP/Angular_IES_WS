import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  private subscription: Subscription;
  private loggedIn: boolean;
  //constructor(private router:Router) { }
  //this.router.navigate(['aplicacion']);

  constructor(
    private broadcastService: BroadcastService, 
    private authService: MsalService,
    private router:Router
  ) {
    if (this.authService.getUser()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    
  }


  login() {
    this.authService.loginRedirect(environment.optiosMsal);
  }

  logout() {
    localStorage.removeItem("payload_token");
    this.authService.logout();
  }

  ngOnInit() {

    this.login() ;


    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log("login failure " + JSON.stringify(payload));
    });

    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
    

        this.router.navigate(['aplicacion/status']);
        localStorage.removeItem("payload_token");
        this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
          console.log("TOKEN CREADO CORRECTAMENTE " + JSON.stringify(payload));
          localStorage.setItem("payload_token", payload._token);
        });

    });

  }


  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
