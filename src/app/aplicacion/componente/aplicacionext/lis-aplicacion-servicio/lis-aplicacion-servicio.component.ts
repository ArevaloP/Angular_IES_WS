import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';
import { UtilConstante } from '../../../modelo/util-contante';

declare var $;


@Component({
  selector: 'app-lis-aplicacion-servicio',
  templateUrl: './lis-aplicacion-servicio.component.html',
  styleUrls: ['./lis-aplicacion-servicio.component.scss']
})
export class LisAplicacionServicioComponent implements OnInit {

  @Input() listaServicio: ServicioWeb[];
  @Input() searchText: String;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild("dataTable", null) table;
  public const: UtilConstante = new UtilConstante();
  public dataTable: any;
  public dtOptions: any = {};

  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));


  p1: number = 1;

  constructor(
    public restServicio: RestServicioWebService,
    public router: Router,
  ) {

  }


  ngOnInit() {

  }




  load(data) {
    //alert("data"+data);
    this.listaServicio = data;
    this.establecerOpcionesDataTable(this.listaServicio);
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }






  public actualizarEstadoServicio(index: number, eve: boolean) {

    //alert(""+index+" =>"+eve);
    //console.log("evento =actualizacion->", eve);

    this.listaServicio[index].checkeado = eve;
    this.listaServicio[index].registradoPor = this.usuarioVO.oid;
    this.listaServicio[index].usuarioRealiza = this.usuarioVO.name;
    
    if (this.listaServicio[index].idAplicacion != "-1") {
      
      //onsole.log("evento !-1",eve);
      if (eve) {

        //console.log("Ccambiando estado de aplicacion !!!");
        this.restServicio.actualizarEstadoServicioAplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se ACTUALIZO exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      } else {//if (!eve) {

        this.restServicio.eliminarServicioWebXaplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se ELIMINO  exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      }
    }
  }



  public funcionActualizacionTabla(index: number) {
    console.log("funcionActualizacionTabla ",index,this.listaServicio[index]);
    this.actualizarEstadoServicio(index, !this.listaServicio[index].checkeado);
  }





  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Código', data: 'codigo', width: "20%" },
        { title: 'Nombre', data: 'nombre', width: "20%" },
        { title: 'Método', data: 'metodo', width: "20%" },
        { title: '', data: 'checkeado', width: "20%", visible: false }

      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      pageLength: 8,
      dom: 'Bfrtip',
      buttons: [
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],
      retrieve: true,
      order: [[4, 'desc'], [2, 'asc']],
      rowCallback: (row: any, dataRow: ServicioWeb, index: number) => {
        const self = this;
        index = row._DT_RowIndex;

        $('td:eq(0)', row).unbind('change');
        if (dataRow.checkeado) {
          $('td:eq(0)', row).html('<div class="cnt-switch"> <label class="switch switch-3d switch-success"> <input type="checkbox" class="switch-input" name="idServicio" checked> <span class="switch-slider"></span> </label> </div>');
        } else {
          $('td:eq(0)', row).html('<div class="cnt-switch"> <label class="switch switch-3d switch-success"> <input type="checkbox" class="switch-input" name="idServicio"> <span class="switch-slider"></span> </label> </div>');
        }


        $('td:eq(0)', row).bind('change', () => {
          this.funcionActualizacionTabla(index);
        });

        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }


    };


  }


  public cambiarEstiloBotones() {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
  }



}
