import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserWebService } from '../modelo/user-web-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestUserWebService {

  userWebService: UserWebService;

  baseUrl = environment.baseUrl + "ws_userservicio";
  constructor(private http: HttpClient) {

  }





  listarUsuarioServicioWeb() {
    return this.http.get<UserWebService[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }

  listarUsuarioServicioWebAplicacion(idAplicacion) {
    //console.log(`${this.baseUrl}/listarXaplicacion/${idAplicacion || -1}`);
    return this.http.get<UserWebService[]>(`${this.baseUrl}/listarXaplicacion/${idAplicacion || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  insertarUserWebService(userWs: UserWebService) {
    return this.http.post(`${this.baseUrl}/insertar`, userWs, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarUserWebService(userWs: UserWebService) {
    return this.http.put(`${this.baseUrl}/actualizar`, userWs, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarUsuarioWebXaplicacion(userWs: UserWebService) {
    return this.http.put(`${this.baseUrl}/actualizarXaplicacion`, userWs, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  listarAplicacionesxUsuario(userWs: UserWebService): any {
    return this.http.get(`${this.baseUrl}/listarAplicacionXUsuario/${userWs.id || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarUserWebService(userWs: UserWebService) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local")
      }),
      body: userWs
    }
    return this.http.delete(`${this.baseUrl}/eliminar/${userWs.id}`, options)
  }


  eliminarUsuarioWebXaplicacion(userWs: UserWebService) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local")
      }),
      body: userWs
    }
    return this.http.delete(`${this.baseUrl}/eliminarXaplicacion`, options)
  }


  actualizarContrasenaUsuario(userWs: UserWebService) :any{
    return this.http.post(`${this.baseUrl}/actualizarPass`, userWs, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  public setUserWebService(userWs: UserWebService) {
    this.userWebService = userWs;
  }

  public getUserWebService() {
    return this.userWebService;
  }




}
