import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestUploadFileService {


  baseUrl = environment.baseUrl + "ws_uploadfile";

  constructor(private httpClient: HttpClient) { }


  public uploadAvatar(data, userId) {
    return this.httpClient.post<any>(`${this.baseUrl}/avatar/${userId}`, data, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      },
      reportProgress: true,
      observe: 'events'

    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled Evento: ${event.type}`;
      }
    })
    );
  }




  public cargarFicheroLibreria(data, userId) {
    return this.httpClient.post<any>(`${this.baseUrl}/libreria/${userId}`, data, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("auth.tk.local"),
      },
      reportProgress: true,
      observe: 'events'

    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled Evento: ${event.type}`;
      }
    })
    );
  }



  




}
