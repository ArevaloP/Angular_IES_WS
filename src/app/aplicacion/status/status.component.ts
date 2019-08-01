import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {


  private subscription: Subscription;
  private loggedIn: boolean;


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

  ngOnInit() {
    alert("x");
    this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log("TOKEN CREADO CORRECTAMENTE " + JSON.stringify(payload));
      localStorage.setItem("payload_token", payload._token);
    });


  }

  getToken(){

    console.log("",localStorage.getItem("payload_token"));
  }






  

 

  
}
