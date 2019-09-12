import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AtributoEquivalencia } from '../modelo/atributo-equivalencia';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestEquivalenciaService {

  implementacionClase: AtributoEquivalencia;
  baseUrl = environment.baseUrl + "ws_equivalencia";
  constructor(private http: HttpClient) {

  }


  listarImplementacionClase(tipo) {
    return this.http.get<AtributoEquivalencia[]>(`${this.baseUrl}/listar/${tipo || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  
  consultarImplementacionClase(id) {
    return this.http.get<AtributoEquivalencia>(`${this.baseUrl}/consultar/${id || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  insertarImplementacionClase(implementacionClase: AtributoEquivalencia) {
    return this.http.post(`${this.baseUrl}/insertar`, implementacionClase, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarImplementacionClase(implementacionClase: AtributoEquivalencia) {
    return this.http.put(`${this.baseUrl}/actualizar`, implementacionClase, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarImplementacionClase(implementacionClase: AtributoEquivalencia) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: implementacionClase
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }


  public setImplementacionClase(implementacionClase: AtributoEquivalencia) {
    this.implementacionClase = implementacionClase;
  }

  public getImplementacionClase() {
    return this.implementacionClase;
  }
}
