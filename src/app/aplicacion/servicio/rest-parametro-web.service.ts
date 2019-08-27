import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParametroServicio } from '../modelo/parametro-servicio';

@Injectable({
  providedIn: 'root'
})
export class RestParametroWebService {

  parametroServicio: ParametroServicio;
  baseUrl = environment.baseUrl + "ws_parametroservicio";
  constructor(private http: HttpClient) {

  }

  listarParametroServicio() {
    return this.http.get<ParametroServicio[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }

  consultarParametroServicio(id) {
    return this.http.get<ParametroServicio>(`${this.baseUrl}/consultar/${id || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  insertarParametroServicio(parametroServicio: ParametroServicio) {
    return this.http.post(`${this.baseUrl}/insertar`, parametroServicio, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarParametroServicio(parametroServicio: ParametroServicio) {
    return this.http.put(`${this.baseUrl}/actualizar`, parametroServicio, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarParametroServicio(parametroServicio: ParametroServicio) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: parametroServicio
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }


  public setParametroServicio(parametroServicio: ParametroServicio) {
    this.parametroServicio = parametroServicio;
  }

  public getParametroServicio() {
    return this.parametroServicio;
  }





}
