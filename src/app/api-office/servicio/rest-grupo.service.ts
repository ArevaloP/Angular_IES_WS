import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestGrupoService {

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
    console.log(url);
    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })
  }

  



  public obtenerPropietarioGrupo():any {

    console.log("token::",sessionStorage.getItem("msal.idtoken"));
    let url = "https://graph.microsoft.com/v1.0/groups/" + environment.group + "/owners"
    //console.log("",url);
    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })
  }





  public obtenerMiembrosGrupo():any {

    console.log("token::",sessionStorage.getItem("msal.idtoken"));
    let url = "https://graph.microsoft.com/v1.0/groups/" + environment.group + "/members"
    console.log("",url);

    return this.http.get(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      }
    })
  }






  public agregarMiembrosGrupo(userId) {

    let url = "https://graph.microsoft.com/v1.0/groups/" + environment.group + "/members/$ref";
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
    let url = "https://graph.microsoft.com/v1.0/groups/" + environment.group + "/members/" + userId + "/$ref";
    return this.http.delete(url, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("msal.idtoken"),
        "Content-Type": "application/json"
      },

    })

  }





}
