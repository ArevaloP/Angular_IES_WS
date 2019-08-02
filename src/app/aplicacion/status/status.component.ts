import { Component, OnInit } from '@angular/core';
import { RestUserAuthService } from '../servicio/rest-user-auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(private restUserAuthService:RestUserAuthService) { }

  ngOnInit() {
  }

  getToken(){

    console.log("b2c.access:",sessionStorage.getItem("b2c.access.token"));
    console.log("adal.idtoken:",sessionStorage.getItem("adal.idtoken"));
    console.log("msal.idtoken: **** ",sessionStorage.getItem("msal.idtoken"));
    
   

  }

  getUser(){
      //console.log("getUser",this.restUserAuthService.getUserEmail());
      console.log("getUser",this.restUserAuthService.getUser());
  }

  logout(){
    this.restUserAuthService.logout();
}
}
