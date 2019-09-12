import { Component, OnInit, ViewChild } from '@angular/core';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';
import { GrupoLlamado } from '../../../modelo/grupo-llamado';
import { UtilConstante } from '../../../modelo/util-contante';
import { RestGrupoLlamadoService } from '../../../servicio/grupo-llamado.service';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';


@Component({
  selector: 'app-lis-grupollamado',
  templateUrl: './lis-grupollamado.component.html',
  styleUrls: ['./lis-grupollamado.component.scss']
})
export class LisGrupollamadoComponent implements OnInit {


  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public dataTable: any;
  public dtOptions: any = {};
  public listadoGrupoLlamado: GrupoLlamado[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));

  constructor(
    public restGrupoLlamado: RestGrupoLlamadoService,
    public restAplicacion: RestAplicacionService,
    public restServicioWeb: RestServicioWebService,
    public router: Router
  ) { }

  ngOnInit() {

    this.restGrupoLlamado.setGrupoLlamado(null);
    this.restAplicacion.setListaAplicaciones( null );
    this.listadoGrupoServicio();
    this.listarAppsExternas();
  }

  public listadoGrupoServicio() {

    this.restGrupoLlamado.listarGrupoLlamado().subscribe(
      data => {
        this.listadoGrupoLlamado = data;
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

  public listarAppsExternas()
  {
    this.restAplicacion.listarAplicacionesExterna().subscribe(
      data => {
        this.restAplicacion.setListaAplicaciones( data );
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }

  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Código', data: 'codigo', width: "20%" },
        { title: 'Nombre', data: 'nombre', width: "50%" },
        { title: 'Aplicación', data: 'idAplicacion', width: "10%" },
        { title: 'Estado', data: 'estado', className: "td-center", width: "10%" },
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR, orderable: false, className: "td-centerm" }
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
            this.router.navigate(['aplicacion/grupollamado/add-grupollamado']);
          },
        },
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],

      rowCallback: (row: Node, dataRow: GrupoLlamado, index: number) => {
        const self = this;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(5)', row).unbind('click');
        $('td:eq(5)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(6)', row).unbind('click');
        $('td:eq(6)', row).bind('click', () => {
          self.irEliminar(this.listadoGrupoLlamado[index]);
        });

        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }

    };


  }




  public modificar(index) {
    this.restGrupoLlamado.setGrupoLlamado(this.listadoGrupoLlamado[index]);
    this.router.navigate(['aplicacion/grupollamado/add-grupollamado']);
  }

  public irEliminar(grupoLlamado) {
    this.alerta.confirmarEliminar(
      ("¿Esta seguro de eliminar el grupo llamado [" + grupoLlamado.nombre + "]?"),
      () => this.eliminar(grupoLlamado)
    );
  }



  public eliminar(grupoLlamado) {
    grupoLlamado.registradoPor = this.usuarioVO.oid;
    this.restGrupoLlamado.eliminarGrupoLlamado(grupoLlamado).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/grupollamado/lis-grupollamado']));
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








}
