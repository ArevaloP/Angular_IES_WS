import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RestErrorService {

  private error: any;
  constructor() {

  }


  public setError(err: any) {
    this.error = err;
  }

  public getError() {
    return this.error;
  }



}
