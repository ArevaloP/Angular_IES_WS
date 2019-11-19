import { Injectable } from '@angular/core';
import { DetalleEquivalencia } from '../modelo/detalle-equivalencia';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EstructuraEntidad } from '../modelo/estructura-entidad';
import { AtributoEquivalencia } from '../modelo/atributo-equivalencia';

@Injectable({
  providedIn: 'root'
})
export class RestDetalleEquivalenciaService
{


  detalleEquivalencia: DetalleEquivalencia;
  baseUrl = environment.baseUrl + "ws_detalleequivalencia";
  contexto = environment.baseUrl + "";
  respuesta:boolean;
  infoData:any;
  urlFichero="";


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


  cargarArchivoDetalleEquivalencia( atributoEquivalencia: AtributoEquivalencia ) {
    return this.http.post(`${this.baseUrl}/cargarDatosXls`, atributoEquivalencia, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  descargarPlatillaEquivalencia( atributoEquiv:AtributoEquivalencia ) {
    return this.http.post<any>(`${this.baseUrl}/plantilla`, atributoEquiv, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  obtenerFichero(download_endpoint: String) {
    let x = `${this.contexto}${download_endpoint}`;
    return x;
  }



  public setRespuesta(respuesta: boolean) {
    this.respuesta = respuesta;
  }

  public getRespuesta() {
    return this.respuesta;
  }


  public setInfoData(infoData: any) {
    this.infoData = infoData;
  }

  public getInfoData() {
    return this.infoData;
  }




}