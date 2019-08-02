


import { Injectable } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class RestUserAuthService {


  private subscription: Subscription;
  private loggedIn: boolean;
  baseUrl = environment.baseUrl + "admin-acceso";

  //constructor(private router:Router) { }
  //this.router.navigate(['aplicacion']);

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private router: Router,
    private http: HttpClient
  ) {
    if (this.authService.getUser()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

  }


  public login(callback): void {
    this.authenticate(callback);
  }

  public authenticate(callback): void {

    this.authService.loginRedirect(environment.optiosMsal); /*then(
      data => {
        console.log("data", data);
        this.cargar(callback);
      },
      error => {
        console.log("error", error);
        callback(false);
      }

    );*/
  }

  public authenticateRedirect(callback): void {

    this.authService.loginPopup(environment.optiosMsal).then(
      data => {
        console.log("data", data);
        this.cargar(callback);
      },
      error => {
        console.log("error", error);
        callback(false);
      }

    );

  }



  cargar(callback) {

    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      //console.log("login failure " + JSON.stringify(payload));
      callback(false);
    });

    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      //console.log("Token generado ok " + JSON.stringify(payload));
      this.saveAccessTokenToCache(payload._token);
      callback(true);
    });

  }

  logout(): void {
    sessionStorage.removeItem("b2c.access.token");
    this.authService.logout();
  };

  isLoggedIn(): boolean {
    return this.authService.getUser() != null;
  };

  getUserEmail(): string {
    return this.getUser().idToken['emails'][0];
  }

  getUser() {
    return this.authService.getUser()
  }



  saveAccessTokenToCache(accessToken: string): void {
    sessionStorage.setItem("b2c.access.token", accessToken);
  };



  public obtenerInformacionGrupo() {
    let url = "https://graph.microsoft.com/v1.0/me/memberOf";
    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })

  }



  public cargarInformacionAdministracion(userData:any, grupo):any {
    
    let dataPost:any={};
    dataPost.id=userData.userIdentifier;
    dataPost.usuario=userData.idToken.preferred_username;
    dataPost.oid=userData.idToken.oid ;
    dataPost.nombre=userData.idToken.name;
    dataPost.grupos=this.getListaGrupo(grupo.value);

    return this.http.post(`${this.baseUrl}/acceso`,dataPost, {
      headers: {
        "Content-Type": "application/json"
      }
    })

  }



  getListaGrupo(lista:any[]){
      //console.log(lista);
      let respuesta:any=[];
      if(lista){
        lista.forEach(element => {
          respuesta.push(element.id);
        });
      }
      //console.log("respuesta",respuesta);
      return respuesta;
  }






}