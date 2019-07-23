import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';
import { Router } from '@angular/router';
import { UtilConstante } from '../../../modelo/util-contante';
declare var $;


@Component({
  selector: 'app-lis-jdbc-conexion',
  templateUrl: './lis-jdbc-conexion.component.html',
  styleUrls: ['./lis-jdbc-conexion.component.scss']
})
export class LisJdbcConexionComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  private dataTable: any;
  private dtOptions: any= {};
  private listadoConexionesJdbc: JdbcConexion[];
  private const: UtilConstante = new UtilConstante();


  constructor(
    private restJdbcConexion: RestJdbcConexionService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.restJdbcConexion.setJdbcConexion(null);
    this.listadoCodnexiones();
  }






  public listadoCodnexiones() {

    this.restJdbcConexion.listarJdbcConexion().subscribe(
      data => {
        console.log(data);
        this.listadoConexionesJdbc = data;
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
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Codigo', data: 'codigo', width: "20%" },
        { title: 'Nombre', data: 'nombre', width: "20%" },
        { title: 'Tipo', data: 'tipoBaseDatos', width: "20%" },
        { title: 'Host', data: 'serverUrl', width: "20%" },
        { title: 'Puerto', data: 'puerto', width: "20%" },
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR,  orderable: false, className: "td-centerm" }

      ],
      paging: true,
      ordering: true,
      info: true,
      dom: 'Bfrtip',
      buttons: [
        {
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            this.router.navigate(['aplicacion/add-conexionjdbc']);
          },
        },
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],

      rowCallback: (row: Node, dataRow: JdbcConexion, index: number) => {
        const self = this;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(6)', row).unbind('click');
        $('td:eq(6)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(7)', row).unbind('click');
        $('td:eq(7)', row).bind('click', () => {
          self.irEliminar(this.listadoConexionesJdbc[index]);
        });

        this.cambiarEstiloBotones();

        return row;
      }


    };


  }





  public modificar(index) {
    this.restJdbcConexion.setJdbcConexion(this.listadoConexionesJdbc[index]);
    this.router.navigate(['aplicacion/add-conexionjdbc']);
  }

  public irEliminar(servicioWeb) {
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar el servicio [" + servicioWeb.nombre + "]  ?"),
      () => this.eliminar(servicioWeb)
    );
  }



  public eliminar(servicioWeb) {
    servicioWeb.registradoPor = "usua_";
    this.restJdbcConexion.eliminarJdbcConexion(servicioWeb).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/jdbc-conexion']));
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
