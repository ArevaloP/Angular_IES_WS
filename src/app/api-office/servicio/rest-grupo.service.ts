import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestGrupoService {


  private grupoAcceso =sessionStorage.getItem("group-lk-acc");
  constructor(
    private http: HttpClient

  ) { }




  public obtenerInformacionGrupo() {
    let url = "https://graph.microsoft.com/v1.0/me/memberOf";
    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })
  }



  public obtenerInformacionUsuario(correo) {
    let url = "https://graph.microsoft.com/v1.0/users/"+correo;
    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })
  }

  



  public obtenerPropietarioGrupo():any {

    //console.log("https://graph.microsoft.com/v1.0/groups/" + this.grupoAcceso + "/owners");
    //console.log("token::",sessionStorage.getItem("msal.idtoken"));
    let url = "https://graph.microsoft.com/v1.0/groups/" + this.grupoAcceso + "/owners"
    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })
  }






  public obtenerMiembrosGrupo():any {

  //console.log("token::",sessionStorage.getItem("msal.idtoken"));
  //console.log("",url);
    let url = "https://graph.microsoft.com/v1.0/groups/" + this.grupoAcceso + "/members"
    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })
  }






  public agregarMiembrosGrupo(userId) {

    let url = "https://graph.microsoft.com/v1.0/groups/" + this.grupoAcceso+ "/members/$ref";
    let usuario = {
      "@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/"+userId
    };
    return this.http.post(url, usuario, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      },

    })

  }


  public eliminarMiembrosGrupo(userId) {
    let url = "https://graph.microsoft.com/v1.0/groups/" + this.grupoAcceso + "/members/" + userId + "/$ref";
    return this.http.delete(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      },

    })

  }





}
