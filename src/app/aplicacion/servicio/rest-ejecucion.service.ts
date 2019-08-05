import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestEjecucionService {


  baseUrl = environment.baseUrl + "ws_ejecucion";
  constructor(private http: HttpClient) { }



  listarEjecucionXusuario(userId): any {

    return this.http.get(`${this.baseUrl}/listarXusuario/${userId||-1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      }
    });
  }




}
