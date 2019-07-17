import { Component, OnInit, Input } from '@angular/core';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';

@Component({
  selector: 'app-lis-aplicacion-servicio',
  templateUrl: './lis-aplicacion-servicio.component.html',
  styleUrls: ['./lis-aplicacion-servicio.component.scss']
})
export class LisAplicacionServicioComponent implements OnInit {

  @Input() listaServicio: ServicioWeb[];
  //@ HostBinding ( 'class' ) className ="box box-primary";
  @Input() searchText: String;


  constructor(
    private restServicio: RestServicioWebService,
  ) {

  }

  ngOnInit() {
  }


  private actualizarEstadoServicio(index: number, eve: any) {

    this.listaServicio[index].checkeado = eve;
    this.listaServicio[index].registradoPor = "reg_";
    this.listaServicio[index].usuarioRealiza = "code_";
    if (this.listaServicio[index].idAplicacion!="-1") {
      if (eve) {
        this.restServicio.actualizarEstadoServicioAplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
          }
        );
      } else if (!eve) {

        this.restServicio.eliminarServicioWebXaplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
          }
        );
      }
    }
  }


}
