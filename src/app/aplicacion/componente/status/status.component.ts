import { Component, OnInit } from '@angular/core';
import { RestUserAuthService } from '../../servicio/rest-user-auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(
    private restUserAuthService: RestUserAuthService,
    private authRest: RestUserAuthService,
  ) { }

  ngOnInit() {
  }

  getToken() {

    console.log("b2c.access:", sessionStorage.getItem("b2c.access.token"));
    console.log("adal.idtoken:", sessionStorage.getItem("adal.idtoken"));
    console.log("msal.idtoken: **** ", sessionStorage.getItem("msal.idtoken"));

    this.getGrupo();

  }

  getUser() {
    //console.log("getUser",this.restUserAuthService.getUserEmail());
    console.log("getUser", this.restUserAuthService.getUser());
  }

  getGrupo() {
    this.authRest.obtenerInformacionGrupo().subscribe(
      data => {
        console.log("GRUPO:", data);
      },
      error => {
        console.error("error:", error);
      }
    )
  }


  logout() {
    this.restUserAuthService.logout();
  }
}
