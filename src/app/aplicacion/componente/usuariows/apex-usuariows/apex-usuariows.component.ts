import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';

@Component({
  selector: 'app-apex-usuariows',
  templateUrl: './apex-usuariows.component.html',
  styleUrls: ['./apex-usuariows.component.scss']
})
export class ApexUsuariowsComponent implements OnInit {

  @Input() userWebService: UserWebService;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  public listaAplicacion:any[];
  p: number = 1;

  constructor(
    private restUsuario: RestUserWebService
  ) { }

  ngOnInit() {
    this.listarAplicacionUsuario();
  }

  public listarAplicacionUsuario(){
    this.restUsuario.listarAplicacionesxUsuario(this.userWebService).subscribe(
      data => {
        this.listaAplicacion=data;
      },
      error => {
        //alert(JSON.stringify(error));
        this.alerta.mostrarError(error);
      }
    );
  }


public actualizarEstadoAplicacion(index, event){


}


}
