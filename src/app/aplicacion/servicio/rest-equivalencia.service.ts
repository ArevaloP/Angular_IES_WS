import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AtributoEquivalencia } from '../modelo/atributo-equivalencia';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestEquivalenciaService {

  atributoEquivalencia: AtributoEquivalencia;
  baseUrl = environment.baseUrl + "ws_equivalencia";
  constructor(private http: HttpClient) {

  }


  listarAtributoEquivalencia(tipo) {
    return this.http.get<AtributoEquivalencia[]>(`${this.baseUrl}/listar/${tipo || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  
  consultarAtributoEquivalencia(id) {
    return this.http.get<AtributoEquivalencia>(`${this.baseUrl}/consultar/${id || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  insertarAtributoEquivalencia(atributoEquivalencia: AtributoEquivalencia) {
    return this.http.post(`${this.baseUrl}/insertar`, atributoEquivalencia, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarAtributoEquivalencia(atributoEquivalencia: AtributoEquivalencia) {
    return this.http.put(`${this.baseUrl}/actualizar`, atributoEquivalencia, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarAtributoEquivalencia(atributoEquivalencia: AtributoEquivalencia) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: atributoEquivalencia
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }


  public setAtributoEquivalencia(atributoEquivalencia: AtributoEquivalencia) {
    this.atributoEquivalencia = atributoEquivalencia;
  }

  public getAtributoEquivalencia() {
    return this.atributoEquivalencia;
  }
}
