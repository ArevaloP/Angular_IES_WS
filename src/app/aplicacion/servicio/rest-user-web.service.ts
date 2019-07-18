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


    usuarios() {
      return this.http.get<any[]>("https://jsonplaceholder.typicode.com/albums", {
        headers: { "Content-Type": "application/json" }
      });
    }


    listarUsuarioServicioWeb() {
      return this.http.get<UserWebService[]>(`${this.baseUrl}/listar`, {
        headers: { "Content-Type": "application/json" }
      });
    }

    listarUsuarioServicioWebAplicacion(idAplicacion) {
      console.log(`${this.baseUrl}/listarXaplicacion/${idAplicacion||-1}`);
      return this.http.get<UserWebService[]>(`${this.baseUrl}/listarXaplicacion/${idAplicacion||-1}`, {
        headers: { "Content-Type": "application/json" }
      });
    }


    insertarUserWebService(userWs: UserWebService) {
      return this.http.post(`${this.baseUrl}/insertar`, userWs, {
        headers: { "Content-Type": "application/json" }
      })
    }


    actualizarUserWebService(userWs: UserWebService) {
      return this.http.put(`${this.baseUrl}/actualizar`, userWs, {
        headers: { "Content-Type": "application/json" }
      })
    }


    actualizarUsuarioWebXaplicacion(userWs: UserWebService) {
      return this.http.put(`${this.baseUrl}/actualizarXaplicacion`, userWs, {
        headers: { "Content-Type": "application/json" }
      })
    }



    eliminarUserWebService(userWs: UserWebService) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body:userWs
      }
      return this.http.delete(`${this.baseUrl}/eliminar/${userWs.id}`, options)
    }


    eliminarUsuarioWebXaplicacion(userWs: UserWebService) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body:userWs
      }
      return this.http.delete(`${this.baseUrl}/eliminarXaplicacion`, options)
    }


    public setUserWebService(userWs: UserWebService) {
      this.userWebService = userWs;
    }

    public getUserWebService() {
      return this.userWebService;
    }




}
