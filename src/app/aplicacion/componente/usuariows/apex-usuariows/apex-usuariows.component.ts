import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { UtilConstante } from '../../../modelo/util-contante';

@Component({
  selector: 'app-apex-usuariows',
  templateUrl: './apex-usuariows.component.html',
  styleUrls: ['./apex-usuariows.component.scss']
})
export class ApexUsuariowsComponent implements OnInit {

  @Input() userWebService: UserWebService;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild("dataTable", null) table;

  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public const: UtilConstante = new UtilConstante();
  public dataTable: any;
  public dtOptions: any = {};



  public listaAplicacion: any[];
  p: number = 1;

  constructor(
    public restUsuario: RestUserWebService

  ) { }

  ngOnInit() {
    this.listarAplicacionUsuario();
  }

  public listarAplicacionUsuario() {
    this.restUsuario.listarAplicacionesxUsuario(this.userWebService).subscribe(
      data => {
        this.listaAplicacion = data;
        this.load(data);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }




  public actualizarEstadoUsuario(index: number, eve: any) {

    this.userWebService.checkeado = eve;
    this.userWebService.registradoPor = this.usuarioVO.oid;
    this.userWebService.usuarioRealiza = this.usuarioVO.name;
    let apex: AplicacionExterna = this.listaAplicacion[index];
    this.userWebService.idAplicacion = apex.id;

    if (this.userWebService.idAplicacion != "-1") {
      if (eve) {
        this.restUsuario.actualizarUsuarioWebXaplicacion(this.userWebService).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.userWebService.checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      } else if (!eve) {

        this.restUsuario.eliminarUsuarioWebXaplicacion(this.userWebService).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.userWebService.checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      }
    }

  }




  load(data) {
    console.log(data);
    this.listaAplicacion = data;
    this.establecerOpcionesDataTable(this.listaAplicacion);
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }




  public funcionActualizacionTabla(index: number) {
    console.log("funcionActualizacionTabla");
    this.actualizarEstadoUsuario(index, !this.listaAplicacion[index].checkeado);
  }



  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Código', data: 'codigo', width: "15%" },
        { title: 'Nombre', data: 'nombre', width: "50%" },
        { title: 'Tipo', data: 'tipo', width: "20%" },
        { title: '', data: 'checkeado', width: "1%", visible: false }

      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      pageLength: 7,
      dom: 'Bfrtip',
      buttons: [
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],
      retrieve: true,
      order: [[4, 'desc'], [2, 'asc']],
      rowCallback: (row: any, dataRow: UserWebService, index: number) => {
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
