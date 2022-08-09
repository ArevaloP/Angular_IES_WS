import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpValida } from '../modelo/ipvalida';
import { IpValidaXAplicacion } from '../modelo/aplicacion-ipvalida';

@Injectable({
  providedIn: 'root'
})
export class RestIpValidaService {
  
    ipvalida: IpValida;
    baseUrl = environment.baseUrl + "ws_ipvalida";
    
    constructor( private http: HttpClient ) { }
  
    listarIpValida(){
      return this.http.get<IpValida[]>(`${this.baseUrl}/listar`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
        }
      });
    }
  
    insertarIpValida(ipvalida: IpValida){
      return this.http.post(`${this.baseUrl}/insertar`, ipvalida, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
        }
      })
    }
  
    actualizarIpValida(ipvalida: IpValida){
      return this.http.put(`${this.baseUrl}/actualizar`, ipvalida, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
        }
      })
    }
  
    eliminarIpValida(ipvalida: IpValida){
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
        }),
        body: ipvalida
      }
      return this.http.delete(`${this.baseUrl}/eliminar`, options)
    }
  
    public setIpValida(ipvalida: IpValida) {
      this.ipvalida = ipvalida;
    }
  
    public getIpValida() {
      return this.ipvalida;
    }



    eliminarIpValidaXaplicacion(ipvalida: IpValidaXAplicacion) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local")
        }),
        body: ipvalida
      }
      return this.http.delete(`${this.baseUrl}/eliminarXaplicacion`, options)
    }


    actualizarIpValidaXaplicacion(ipvalida: IpValidaXAplicacion) {
      return this.http.put(`${this.baseUrl}/actualizarXaplicacion`, ipvalida, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
        }
      })
    }


    listarIpValidaAplicacion(idAplicacion) {
      //console.log(`${this.baseUrl}/listarXaplicacion/${idAplicacion || -1}`);
      return this.http.get<IpValidaXAplicacion[]>(`${this.baseUrl}/listarXaplicacion/${idAplicacion || -1}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
        }
      });
    }



}
