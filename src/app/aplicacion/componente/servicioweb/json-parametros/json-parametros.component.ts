import { Component, OnInit, Input } from '@angular/core';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { ParametroServicio } from '../../../modelo/parametro-servicio';

@Component({
  selector: 'app-json-parametros',
  templateUrl: './json-parametros.component.html',
  styleUrls: ['./json-parametros.component.scss']
})
export class JsonParametrosComponent implements OnInit {
  //public ejemplo: any = "Ejemplo";
  @Input() listaParametros: ParametroServicio[];
  constructor(
    public restParametro: RestParametroWebService
  ) { }

  ngOnInit() {
    
  }
}
