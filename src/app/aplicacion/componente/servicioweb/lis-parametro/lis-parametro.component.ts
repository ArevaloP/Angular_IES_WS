import { Component, OnInit, ViewChild } from '@angular/core';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';
import { Router } from '@angular/router';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';

@Component({
  selector: 'app-lis-parametro',
  templateUrl: './lis-parametro.component.html',
  styleUrls: ['./lis-parametro.component.scss']
})
export class LisParametroComponent implements OnInit {


  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public dataTable: any;
  public dtOptions: any = {}// DataTables.Settings = {};
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listadoParametroServicio: ParametroServicio[];


  constructor(
    public restParametro:RestParametroWebService,
    public router: Router
  ) { }

  ngOnInit() {
    this.restParametro.setParametroServicio(null);
    this.listarParametroServicio();
  }


  public listarParametroServicio() {

    this.restParametro.listarParametroServicio().subscribe(
      data => {
        console.log(data);
        this.listadoParametroServicio = data;
        this.establecerOpcionesDataTable(data);
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      },
      error => {
        //alert("Error en la consultad de aplicaccin " + JSON.stringify(error));
        this.alerta.mostrarError(error);
      }
    );

  }





  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: 'Orden', data: 'orden', width: "5%", className: "text-left" },
        { title: 'Alias', data: 'aliasColumna', width: "35%", className: "text-left" },
        { title: 'Descripción', data: 'descripcion', width: "60%", className: "text-left" },
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR, orderable: false, className: "td-center" }
      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      dom: 'Bfrtip',
      buttons: [
        {
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            this.router.navigate(['aplicacion/add-parametro']);
          },
        },
        { extend: 'copy', "text": 'Export', className: `${this.const.CLASE_COPIAR}` },
        { extend: 'excel', "text": 'Export', className: `${this.const.CLASE_EXCEL}` }
      ],


      // rowCallback: (row: Node, dataRow: ParametroServicio, index: number) => {
      //   const self = this;

      //   $('td:eq(0)', row).unbind('click');
      //   $('td:eq(0)', row).bind('click', () => {
      //     self.modificar(index);
      //   });

      //   $('td:eq(6)', row).unbind('click');
      //   $('td:eq(6)', row).bind('click', () => {
      //     self.modificar(index);
      //   });

      //   $('td:eq(7)', row).unbind('click');
      //   $('td:eq(7)', row).bind('click', () => {
      //     self.irEliminar(this.listadoParametroServicio[index]);
      //   });
      //   this.cambiarEstiloBotones();
      //   return row;
      // }


    };


  }



  public modificar(index) {
    //this.restServicio.setServicioWeb(this.listadoServicioWeb[index]);
    //this.router.navigate(['aplicacion/add-servicioweb']);
  }





  public irEliminar(servicioWeb) {
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar el servicio [" + servicioWeb.nombre + "]  ?"),
      () => this.eliminar(servicioWeb)
    );
  }



  public eliminar(servicioWeb) {
    /*servicioWeb.registradoPor = this.usuarioVO.oid;;
    this.restServicio.eliminarServicioWeb(servicioWeb).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/servicioWeb']));
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );*/
  }





  public cambiarEstiloBotones() {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
  }



}
