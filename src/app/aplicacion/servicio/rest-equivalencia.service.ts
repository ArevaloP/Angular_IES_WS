import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AtributoEquivalencia } from '../modelo/atributo-equivalencia';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestEquivalenciaService {

  entidadEquivalencia: AtributoEquivalencia;
  baseUrl = environment.baseUrl + "ws_equivalencia";

  constructor(private http: HttpClient) {
  }

  listarEntidades() {
    return this.http.get<AtributoEquivalencia[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }
  
  consultarEntidad(id) {
    return this.http.get<AtributoEquivalencia>(`${this.baseUrl}/consultar/${id || -1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }

  insertarEntidad( entidadEquivalencia: AtributoEquivalencia )
  {
    return this.http.post(`${this.baseUrl}/insertar`, entidadEquivalencia, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }

  actualizarEntidad( entidadEquivalencia: AtributoEquivalencia )
  {
    return this.http.put(`${this.baseUrl}/actualizar`, entidadEquivalencia, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }

  eliminarEntidad( entidadEquivalencia: AtributoEquivalencia )
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: entidadEquivalencia
    }

    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }

  public setEntidadEquivalencia(entidadEquivalencia: AtributoEquivalencia)
  {
    this.entidadEquivalencia = entidadEquivalencia;
  }

  public getEntidadEquivalencia()
  {
    return this.entidadEquivalencia;
  }
}