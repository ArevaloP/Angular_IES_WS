import { Injectable } from '@angular/core';
import { JdbcConexion } from '../modelo/jdbc-conexion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestJdbcConexionService {

  jdbcConexion:JdbcConexion;
  baseUrl = environment.baseUrl + "ws_jdbcconexion";
  constructor(private http: HttpClient) {

  }


  listarJdbcConexion() {
    return this.http.get<JdbcConexion[]>(`${this.baseUrl}/listar`, {
      headers: { "Content-Type": "application/json" }
    });
  }

  consultarJdbcConexion(id) {
    return this.http.get<JdbcConexion>(`${this.baseUrl}/consultar/${id||-1}`, {
      headers: { "Content-Type": "application/json" }
    });
  }


  testearJdbcConexion(jdbcConexion: JdbcConexion) {
    return this.http.post<JdbcConexion[]>(`${this.baseUrl}/test`, jdbcConexion, {
      headers: { "Content-Type": "application/json" }
    })
  }


  insertarJdbcConexion(jdbcConexion: JdbcConexion) {
    return this.http.post(`${this.baseUrl}/insertar`, jdbcConexion, {
      headers: { "Content-Type": "application/json" }
    })
  }


  actualizarJdbcConexion(jdbcConexion: JdbcConexion) {
    return this.http.put(`${this.baseUrl}/actualizar`, jdbcConexion, {
      headers: { "Content-Type": "application/json" }
    })
  }



  eliminarJdbcConexion(jdbcConexion: JdbcConexion) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body:jdbcConexion
    }
    return this.http.delete(`${this.baseUrl}/eliminar`, options)
  }


  public setJdbcConexion(jdbcConexion: JdbcConexion) {
    this.jdbcConexion = jdbcConexion;
  }

  public getJdbcConexion() {
    return this.jdbcConexion;
  }

}
