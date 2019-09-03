import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';

@Component({
  selector: 'app-lis-aplicacion-usuario',
  templateUrl: './lis-aplicacion-usuario.component.html',
  styleUrls: ['./lis-aplicacion-usuario.component.scss']
})
export class LisAplicacionUsuarioComponent implements OnInit {



  @Input() listaUsuarioWs: UserWebService[];
  @Input() searchText: String;

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild("dataTable", null) table;

  public const: UtilConstante = new UtilConstante();
  public dataTable: any;
  public dtOptions: any = {};



  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  p: number = 1;
  p2: number = 1;

  constructor(
    public restUsuario: RestUserWebService,

  ) { }

  ngOnInit() {
  }



  public actualizarEstadoUsuario(index: number, eve: any) {

    this.listaUsuarioWs[index].checkeado = eve;
    this.listaUsuarioWs[index].registradoPor = this.usuarioVO.oid;
    this.listaUsuarioWs[index].usuarioRealiza = this.usuarioVO.name;

    if (this.listaUsuarioWs[index].idAplicacion != "-1") {
      if (eve) {
        this.restUsuario.actualizarUsuarioWebXaplicacion(this.listaUsuarioWs[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaUsuarioWs[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      } else if (!eve) {

        this.restUsuario.eliminarUsuarioWebXaplicacion(this.listaUsuarioWs[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaUsuarioWs[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      }
    }

  }



  load(data) {

    this.listaUsuarioWs = data;
    this.establecerOpcionesDataTable(this.listaUsuarioWs);
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);

  }



  public funcionActualizacionTabla(index: number) {
    console.log("funcionActualizacionTabla");
    this.actualizarEstadoUsuario(index, !this.listaUsuarioWs[index].checkeado);
  }





  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: '', width: "15%", orderable: false, className: "td-center" },
        { title: 'Avatar', defaultContent: '', width: "20%", orderable: false, className: "td-center" },
        { title: 'Nombre', data: 'nombre', width: "20%" },
        { title: 'Usuario', data: 'usuario', width: "20%" },
        { title: '', data: 'checkeado', width: "20%" , visible:false}

      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      pageLength: 6,
      dom: 'Bfrtip',
      buttons: [

        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],
      retrieve: true,
      order: [[4, 'desc'],[2, 'asc']],
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

        $('td:eq(1)', row).unbind('click');
        let imagen = dataRow.imagen || '/assets/img/avatars/no-disponible.png';
        $('td:eq(1)', row).html('<img class="img-circle-40" src="' + imagen + '">');

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
