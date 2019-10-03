import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ServicioWeb } from '../modelo/servicio-web';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestServicioWebService {

  servicioWeb: ServicioWeb;
  listaServicio: ServicioWeb[];
  idServicio: String;

  baseUrl = environment.baseUrl + "ws_webservice";
  constructor(private http: HttpClient) {

  }


  listarServicioWeb() {
    return this.http.get<ServicioWeb[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  listarServicioWebAplicacion(idAplicacion) {
    //console.log(`${this.baseUrl}/listarXaplicacion/${idAplicacion||-1}`);
    return this.http.get<ServicioWeb[]>(`${this.baseUrl}/listarXaplicacion/${idAplicacion || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }

  listarServicioWebPorGrupo(idGrupo)
  {
    return this.http.get<ServicioWeb[]>(`${this.baseUrl}/listarPorGrupo/${idGrupo || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  insertarServicioWeb(servicioWeb: ServicioWeb) {
    return this.http.post(`${this.baseUrl}/insertar`, servicioWeb, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarServicioWeb(servicioWeb: ServicioWeb) {
    return this.http.put(`${this.baseUrl}/actualizar`, servicioWeb, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  actualizarEstadoServicioAplicacion(servicioWeb: ServicioWeb) {
    return this.http.put(`${this.baseUrl}/actualizarXaplicacion`, servicioWeb, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarServicioWeb(servicioWeb: ServicioWeb) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: servicioWeb
    }
    return this.http.delete(`${this.baseUrl}/eliminar/${servicioWeb.id}`, options)
  }


  eliminarServicioWebXaplicacion(servicioWeb: ServicioWeb) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: servicioWeb
    }
    return this.http.delete(`${this.baseUrl}/eliminarXaplicacion`, options)
  }



  public setServicioWeb(servicioWeb: ServicioWeb) {
    this.servicioWeb = servicioWeb;
  }

  public getServicioWeb() {
    return this.servicioWeb;
  }


  public setListaServicio(listaServicio: ServicioWeb[]) {
    this.listaServicio = listaServicio;
  }

  public getListaServicio() {
    return this.listaServicio;
  }

  public setIdServicio(idServicio: String) {
    this.idServicio = idServicio;
  }

  public getIdServicio() {
    return this.idServicio;
  }
}
