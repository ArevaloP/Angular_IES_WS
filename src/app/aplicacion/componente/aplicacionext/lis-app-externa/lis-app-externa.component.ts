import { Component, OnInit } from '@angular/core';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


@Component({
  selector: 'app-lis-app-externa',
  templateUrl: './lis-app-externa.component.html',
  styleUrls: ['./lis-app-externa.component.scss']
})
export class LisAppExternaComponent implements OnInit {


  private listadoAplicacionExterna:AplicacionExterna[];
  constructor(private restAplicacion:RestAplicacionService) {

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





}
