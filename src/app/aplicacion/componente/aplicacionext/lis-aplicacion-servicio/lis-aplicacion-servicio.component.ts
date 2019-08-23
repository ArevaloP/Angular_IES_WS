import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

declare var $;


@Component({
  selector: 'app-lis-aplicacion-servicio',
  templateUrl: './lis-aplicacion-servicio.component.html',
  styleUrls: ['./lis-aplicacion-servicio.component.scss']
})
export class LisAplicacionServicioComponent implements OnInit {

  @Input() listaServicio: ServicioWeb[];
  //@ HostBinding ( 'class' ) className ="box box-primary";
  @Input() searchText: String;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  

  //@ViewChild("dataTable", null) table;
  //public dataTable: any;
  //public dtOptions: DataTables.Settings = {};

  p1: number = 1;

  constructor(
    public restServicio: RestServicioWebService,
  ) {

  }


  ngOnInit() {

  }






  public actualizarEstadoServicio(index: number, eve: any) {

    //alert(""+index+" =>"+eve);
    this.listaServicio[index].checkeado = eve;
    this.listaServicio[index].registradoPor = this.usuarioVO.oid;
    this.listaServicio[index].usuarioRealiza = this.usuarioVO.name;
    if (this.listaServicio[index].idAplicacion!="-1") {
      if (eve) {
        this.restServicio.actualizarEstadoServicioAplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      } else if (!eve) {

        this.restServicio.eliminarServicioWebXaplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      }
    }
  }


}
