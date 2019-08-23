import { Component, OnInit, ViewChild } from '@angular/core';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router } from '@angular/router';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';


@Component({
  selector: 'app-lis-app-externa',
  templateUrl: './lis-app-externa.component.html',
  styleUrls: ['./lis-app-externa.component.scss']
})
export class LisAppExternaComponent implements OnInit {

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  public listadoAplicacionExterna: AplicacionExterna[];
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  
  constructor(
    public restAplicacion: RestAplicacionService,
    public router: Router
  ) {

  }

  ngOnInit() {


    this.restAplicacion.setAplicacionExterna(null);
    this.restAplicacion.listarAplicacionesExterna().subscribe(
      data => {
        this.listadoAplicacionExterna = data;
        //console.log("trae datos de listado !!!", this.listadoAplicacionExterna);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )

  }



  public modificar(index) {

    this.restAplicacion.setAplicacionExterna(this.listadoAplicacionExterna[index]);
    this.router.navigate(['aplicacion/add-appexterna']);
  }



  public irEliminar(index) {
    let aplicacionExterna = this.listadoAplicacionExterna[index];
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar la aplicación [" + aplicacionExterna.nombre + "]  ?"),
      () => this.eliminar(aplicacionExterna)
    );
  }



  public eliminar(aplicacionExterna) {
    aplicacionExterna.registradoPor = this.usuarioVO.oid;
    return this.restAplicacion.eliminarAplicacionExterna(aplicacionExterna).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/lis-appexterna']));
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }





}
