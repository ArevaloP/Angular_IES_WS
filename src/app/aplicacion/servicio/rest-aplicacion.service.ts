import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AplicacionExterna } from '../modelo/aplicacion-externa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestAplicacionService {


    aplicacionExterna: AplicacionExterna;

    baseUrl = environment.baseUrl + "ws_appexterna";
    constructor(private http: HttpClient) {

    }


    listarAplicacionesExterna() {
      return this.http.get<AplicacionExterna[]>(`${this.baseUrl}/listar`, {
        headers: { "Content-Type": "application/json" }
      });
    }


    insertarAplicacionExterna(appExterna: AplicacionExterna) {
      return this.http.post(`${this.baseUrl}/insertar`, appExterna, {
        headers: { "Content-Type": "application/json" }
      })
    }


    actualizarAplicacionExterna(appExterna: AplicacionExterna) {
      return this.http.put(`${this.baseUrl}/actualizar`, appExterna, {
        headers: { "Content-Type": "application/json" }
      })
    }



    eliminarAplicacionExterna(appExterna: AplicacionExterna) {
      return this.http.delete(`${this.baseUrl}/eliminar/${appExterna.id}`, {
        headers: { "Content-Type": "application/json" }
      })
    }


    public setAplicacionExterna(appExterna: AplicacionExterna) {
      this.aplicacionExterna = appExterna;
    }

    public getAplicacionExterna() {
      return this.aplicacionExterna;
    }



}
