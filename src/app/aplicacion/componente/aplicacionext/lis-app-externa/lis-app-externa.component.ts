import { Component, OnInit } from '@angular/core';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lis-app-externa',
  templateUrl: './lis-app-externa.component.html',
  styleUrls: ['./lis-app-externa.component.scss']
})
export class LisAppExternaComponent implements OnInit {


  private listadoAplicacionExterna:AplicacionExterna[];
  constructor(
    private restAplicacion:RestAplicacionService,
    private router: Router
    ) {

  }

  ngOnInit() {


    this.restAplicacion.setAplicacionExterna(null);
    this.restAplicacion.listarAplicacionesExterna().subscribe(
      data => {
        this.listadoAplicacionExterna = data;
        console.log("trae datos de listado !!!",this.listadoAplicacionExterna);
      },
      error => { 
        alert("Error en la consultad de aplicaccin " + JSON.stringify(error)); 
      }
    )

  }



  public modificar(index) {
    //console.log("verModificar !!!! " + index);
    this.restAplicacion.setAplicacionExterna(this.listadoAplicacionExterna[index]);
    this.router.navigate(['aplicacion/add-appexterna']);
  }


  public eliminar(index) {
    return this.restAplicacion.eliminarAplicacionExterna(this.listadoAplicacionExterna[index]).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
        this.router.navigate(['aplicacion/lis-appexterna']));
      },
      error => { }
    );
  }
  




}
