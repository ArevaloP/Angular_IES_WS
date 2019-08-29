import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImplementacionClase } from '../modelo/implementacion-clase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestImplementacionClaseService {

  implementacionClase: ImplementacionClase;
  baseUrl = environment.baseUrl + "ws_implementacionclass";
  constructor(private http: HttpClient) {

  }


  listarImplementacionClase(tipo) {
    return this.http.get<ImplementacionClase[]>(`${this.baseUrl}/listar/${tipo || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  
  consultarImplementacionClase(id) {
    return this.http.get<ImplementacionClase>(`${this.baseUrl}/consultar/${id || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  insertarImplementacionClase(implementacionClase: ImplementacionClase) {
    return this.http.post(`${this.baseUrl}/insertar`, implementacionClase, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarImplementacionClase(implementacionClase: ImplementacionClase) {
    return this.http.put(`${this.baseUrl}/actualizar`, implementacionClase, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarImplementacionClase(implementacionClase: ImplementacionClase) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: implementacionClase
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }


  public setImplementacionClase(implementacionClase: ImplementacionClase) {
    this.implementacionClase = implementacionClase;
  }

  public getImplementacionClase() {
    return this.implementacionClase;
  }

}
