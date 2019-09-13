import { Injectable } from '@angular/core';
import { DetalleEquivalencia } from '../modelo/detalle-equivalencia';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EstructuraEntidad } from '../modelo/estructura-entidad';

@Injectable({
  providedIn: 'root'
})
export class RestDetalleEquivalenciaService
{
  detalleEquivalencia: DetalleEquivalencia;
  baseUrl = environment.baseUrl + "ws_detalleequivalencia";
  
  constructor(private http: HttpClient) { }

  consultarDetallesAtributos( detalleEquivalencia: DetalleEquivalencia )
  {
    return this.http.post<EstructuraEntidad>(`${this.baseUrl}/listarDetallesAtrib`, detalleEquivalencia, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }
}