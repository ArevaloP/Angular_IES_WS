import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-parametro',
  templateUrl: './tabla-parametro.component.html',
  styleUrls: ['./tabla-parametro.component.scss']
})
export class TablaParametroComponent implements OnInit {


  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  public listadoParametro: ParametroServicio[];
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));

  constructor(
    public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public router: Router
  ) {
  }

  ngOnInit() {

    //console.log("this.restServicio.)>",this.restServicio.getServicioWeb());
    this.restParametro.consultarColumnaParametro(this.restServicio.getServicioWeb()).subscribe(
      data => {
        this.listadoParametro = data;
        this.incluirDatosListado();
      }, error => {
        this.alerta.mostrarError(error);
      }

    )

  }





  public irRegistrar() {

    console.log(this.listadoParametro);
    this.restParametro.registrarParametroTabla(this.listadoParametro).subscribe(
      data => {
        //alert("proceso realizado correctamemte");
        this.router.navigate(['aplicacion/servicio/lis-parametro']);
      }, error => {
        this.alerta.mostrarError(error);
      }

    )

  }


  public incluirDatosListado() {
    
    if (this.listadoParametro != null) {
      for (let i in this.listadoParametro) {
        this.listadoParametro[i].registradoPor = this.usuarioVO.oid;
        this.listadoParametro[i].usuarioRealiza = this.usuarioVO.name;
        this.listadoParametro[i].idServicioWeb = this.restServicio.getServicioWeb().id;
      }
    }

  }


  public modoManual(){
    this.router.navigate(['aplicacion/servicio/add-parametro']);
  }




}
