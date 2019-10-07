import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ListaParametro } from '../modelo/lista-parametro';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestParametroArrayService
{
  listaParametro: ListaParametro;
  baseUrl = environment.baseUrl + "ws_listaparametro";
  
  constructor( private http: HttpClient ) { }

  listarParametros()
  {
    return this.http.get<ListaParametro[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }

  insertarListaParametros(listaParametro: ListaParametro)
  {
    return this.http.post(`${this.baseUrl}/insertar`, listaParametro, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }

  actualizarListaParametros(listaParametro: ListaParametro)
  {
    return this.http.put(`${this.baseUrl}/actualizar`, listaParametro, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    })
  }

  eliminarListaParametros(listaParametro: ListaParametro)
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }),
      body: listaParametro
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }

  public setListaParametro(listaParametro: ListaParametro) {
    this.listaParametro = listaParametro;
  }

  public getListaParametro() {
    return this.listaParametro;
  }
}