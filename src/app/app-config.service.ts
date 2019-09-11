import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient) { }

  loadAppConfig() {

    console.log("===loadAppConfig===");
    return this.http.get('assets/config/configuracion.json')
    .toPromise()
    .then(data => {
      this.appConfig = data;
      console.log("cargo la configuracion ", data);
    },error=>{
        console.log("error 2145",error);
    }
    
    );
  }





  getConfig() {
    return this.appConfig;
  }
}