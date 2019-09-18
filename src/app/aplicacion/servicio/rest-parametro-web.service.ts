import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParametroServicio } from '../modelo/parametro-servicio';
import { ServicioWeb } from '../modelo/servicio-web';

@Injectable({
  providedIn: 'root'
})
export class RestParametroWebService {

  parametroServicio: ParametroServicio;
  listaParametroServicio: ParametroServicio[];
  respuesta:boolean;
  infoData:any;

  baseUrl = environment.baseUrl + "ws_parametroservicio";
  constructor(private http: HttpClient) {

  }

  listarParametroServicio( parametroServicio: ParametroServicio ) {
    return this.http.post<ParametroServicio[]>(`${this.baseUrl}/listar`, parametroServicio, {
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


  

  consultarColumnaParametro( webService: ServicioWeb ) {
    return this.http.post<ParametroServicio[]>(`${this.baseUrl}/consultarColumna`, webService, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  registrarParametroTabla( listaParametro: ParametroServicio[] ) {
      return this.http.post(`${this.baseUrl}/registrarParametroTabla`, listaParametro, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
        }
      });
  }


  listarParametroEquivalencia( parametroServicio: ParametroServicio ) {
    return this.http.post<ParametroServicio[]>(`${this.baseUrl}/listarParametroEquivalencia`, parametroServicio, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }


  cargarArchivoParametroDatos( webService: ServicioWeb ) {
    return this.http.post(`${this.baseUrl}/cargarDatosXls`, webService, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




  public setParametroServicio(parametroServicio: ParametroServicio) {
    this.parametroServicio = parametroServicio;
  }

  public getParametroServicio() {
    return this.parametroServicio;
  }

  public setListaParametroServicio(listaParametroServicio: ParametroServicio[]) {
    this.listaParametroServicio = listaParametroServicio;
  }

  public getListaParametroServicio() {
    return this.listaParametroServicio;
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