import { Component, OnInit } from '@angular/core';
import { RestErrorService } from '../../aplicacion/servicio/rest-error.service';

@Component({
  templateUrl: '500.component.html',
  styleUrls: ['500.scss']
})
export class P500Component implements OnInit {

  public error:any;
  public texto;
  constructor(private restErrorService:RestErrorService) {

  }


  ngOnInit() {
    this.error= this.restErrorService.getError();
    this.texto=JSON.stringify(this.error);
  }

}
