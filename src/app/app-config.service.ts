import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config/configuracion.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
        console.log("cargo la configuracion ", data);
      });
  }

  getConfig() {
    return this.appConfig;
  }
}