import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AplicacionExterna } from '../modelo/aplicacion-externa';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestAplicacionService {


  aplicacionExterna: AplicacionExterna;
  listaAplicaciones: AplicacionExterna[];

  baseUrl = environment.baseUrl + "ws_appexterna";
  constructor(private http: HttpClient) {

  }


  listarAplicacionesExterna() {

    console.log(sessionStorage.getItem("auth.tk.local"));
    return this.http.get<AplicacionExterna[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  insertarAplicacionExterna(appExterna: AplicacionExterna) {
    return this.http.post(`${this.baseUrl}/insertar`, appExterna, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarAplicacionExterna(appExterna: AplicacionExterna) {
    return this.http.put(`${this.baseUrl}/actualizar`, appExterna, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarAplicacionExterna(appExterna: AplicacionExterna) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: appExterna
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }


  public setAplicacionExterna(appExterna: AplicacionExterna) {
    this.aplicacionExterna = appExterna;
  }

  public getAplicacionExterna() {
    return this.aplicacionExterna;
  }

  public setListaAplicaciones(lista: AplicacionExterna[]) {
    this.listaAplicaciones = lista;
  }

  public getListaAplicaciones() {
    return this.listaAplicaciones;
  }

}
