import { Component, OnInit } from '@angular/core';
import { RestErrorService } from '../../aplicacion/servicio/rest-error.service';

@Component({
  templateUrl: '500.component.html'
})
export class P500Component implements OnInit {

  private error:any;
  private texto;
  constructor(private restErrorService:RestErrorService) {

  }


  ngOnInit() {
    this.error= this.restErrorService.getError();
    this.texto=JSON.stringify(this.error);
  }

}
