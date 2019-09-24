import { Component, OnInit, ViewChild } from '@angular/core';


import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';
import { Router } from '@angular/router';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-lis-sub-parametro',
  templateUrl: './lis-sub-parametro.component.html',
  styleUrls: ['./lis-sub-parametro.component.scss']
})
export class LisSubParametroComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  


  public dataTable: any;
  public dtOptions: any = {}// DataTables.Settings = {};
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listadoSubParametroServicio: ParametroServicio[];
  public servicioWeb: ServicioWeb;
  public subParametroServicio: ParametroServicio = new ParametroServicio();
  public nombreServicioWeb: String;
  public nombreParametro: String;

  
  constructor(
    public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public router: Router
  ) { }

  ngOnInit() {
    this.nombreServicioWeb = "-";
    this.listarSubParametroServicio();
  }


  public listarSubParametroServicio() {

    this.nombreServicioWeb = this.restServicio.getServicioWeb().nombre;
    this.nombreParametro = this.restParametro.getParametroServicio().parametro+" - "+this.restParametro.getParametroServicio().aliasColumna;

    this.subParametroServicio.idListaAsociado = this.restParametro.getParametroServicio().idListaPadre;
    this.restParametro.listarSubParametro(this.subParametroServicio).subscribe(
      data => {
        this.listadoSubParametroServicio = data;
        this.establecerOpcionesDataTable(data);
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: 'Orden', data: 'orden', width: "5%", className: "text-center" },
        { title: 'Nombre', data: 'parametro', width: "10%", className: "text-left" },
        { title: 'Alias', data: 'aliasColumna', width: "35%", className: "text-left" },
        { title: 'Defecto', data: 'valorFijo', defaultContent: "", width: "10%", className: "text-left" },
        { title: 'Equiv', data: 'idEquivalencia', defaultContent: "", width: "7%", className: "text-center" },
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
      order: [[0, 'asc']],
      buttons: [
        {
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
              this.router.navigate(['aplicacion/parametro/add-sub-parametro']);
          },
        },
        {
          text: `${this.const.ICONO_AGREGARXLS}`,
          className: `${this.const.CLASE_AGREGARXLS}`,
          action: () => {
            this.cargarArchivoXls();
          },
        },
        { extend: 'copy', "text": 'Export', className: `${this.const.CLASE_COPIAR}` },
        { extend: 'excel', "text": 'Export', className: `${this.const.CLASE_EXCEL}` }
      ],
      rowCallback: (row: any, dataRow: ParametroServicio, index: number) => {
        const self = this;
        index = row._DT_RowIndex;

        $('td:eq(4)', row).unbind('click');
        if (dataRow.idEquivalencia) {
          $('td:eq(4)', row).html('<i class="fa fa-random" style="font-size:16px; color:orange" aria-hidden="true"></i>');
        }
   

        $('td:eq(5)', row).unbind('click');
        $('td:eq(5)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(6)', row).unbind('click');
        $('td:eq(6)', row).bind('click', () => {
          self.irEliminar(this.listadoSubParametroServicio[index]);
        });

        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }
    };
  }

  public modificar(index) {
    //console.log("sub",this.listadoSubParametroServicio[index]);
    this.restParametro.setSubParametroServicio(this.listadoSubParametroServicio[index]);
    this.router.navigate(['aplicacion/parametro/add-sub-parametro']);
  }

  public irEliminar(subParametroServicio) {
    
    this.alerta.confirmarEliminar(
      ("¿Está seguro de eliminar el parámetro [" + subParametroServicio.parametro + "]?"),
      () => this.eliminar(subParametroServicio)
    );
  }



  public eliminar(subParametroServicio) {
    subParametroServicio.registradoPor = this.usuarioVO.oid;
    this.restParametro.eliminarParametroServicio(subParametroServicio).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
          () => this.router.navigate(['aplicacion/servicio/lis-sub-parametro'])
        );
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public cambiarEstiloBotones() {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
  }



  public cargarArchivoXls() {
    this.alerta.agregarParametroArrayXlsVentana(
      this.servicioWeb,
      () => this.recargarListado()
    );
  }


  public async recargarListado() {
    console.log("Respuesta:::",this.restParametro.getRespuesta());
    if(this.restParametro.getRespuesta()){
      this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
        () => this.router.navigate(['aplicacion/servicio/lis-sub-parametro'])
      );
    }else{
      this.alerta.mostrarError(this.restParametro.getInfoData());
    } 
  }


}
