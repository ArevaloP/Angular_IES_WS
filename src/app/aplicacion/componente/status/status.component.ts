import { Component, OnInit } from '@angular/core';
import { RestUserAuthService } from '../../servicio/rest-user-auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(
    public restUserAuthService: RestUserAuthService,
    public authRest: RestUserAuthService,
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

  creraGrupo() {
    let userLog: any = this.authRest.getUser().idToken;
    this.authRest.crearGrupoAcceso(userLog.oid).subscribe(
      data => {
          alert(data);
      },
      error => {
        console.log(error);
        //this.restError.setError(error);
        //this.router.navigate(['500']);
      }
    )
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
