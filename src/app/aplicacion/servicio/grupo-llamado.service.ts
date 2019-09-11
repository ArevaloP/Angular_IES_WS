import { Injectable } from '@angular/core';
import { GrupoLlamado } from '../modelo/grupo-llamado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestGrupoLlamadoService {



  grupoLlamado: GrupoLlamado;
  listaLlamado: GrupoLlamado[];

  baseUrl = environment.baseUrl + "ws_grupollamado";
  constructor(private http: HttpClient) {

  }


  listarGrupoLlamado() {
    return this.http.get<GrupoLlamado[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }



  insertarGrupoLlamado(grupoLlamado: GrupoLlamado) {
    return this.http.post(`${this.baseUrl}/insertar`, grupoLlamado, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }


  actualizarGrupoLlamado(grupoLlamado: GrupoLlamado) {
    return this.http.put(`${this.baseUrl}/actualizar`, grupoLlamado, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }



  eliminarGrupoLlamado(grupoLlamado: GrupoLlamado) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: grupoLlamado
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }





  public setGrupoLlamado(grupoLlamado: GrupoLlamado) {
    this.grupoLlamado = grupoLlamado;
  }

  public getGrupoLlamado() {
    return this.grupoLlamado;
  }


  public setlistaLlamado(listaLlamado: GrupoLlamado[]) {
    this.listaLlamado = listaLlamado;
  }

  public getlistaLlamado() {
    return this.listaLlamado;
  }


}
