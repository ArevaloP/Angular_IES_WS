import { Component, OnInit, ViewChild } from '@angular/core';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';
import { Router } from '@angular/router';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { ServicioWeb } from '../../../modelo/servicio-web';

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
  public servicioWeb: ServicioWeb;
  public parametroServicio: ParametroServicio = new ParametroServicio();
  public nombreServicioWeb: String;
  public componenteTabla: boolean = false;


  constructor(
    public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public router: Router
  ) { }

  ngOnInit() {
    this.restParametro.setParametroServicio(null);
    this.restParametro.setListaParametroServicio(null);
    this.nombreServicioWeb = "-";
    this.listarParametroServicio();
  }


  public listarParametroServicio() {

    this.componenteTabla = this.restServicio.getServicioWeb().tipo == 'TABLA' && (this.restServicio.getServicioWeb().metodo == 'POST' || this.restServicio.getServicioWeb().metodo == 'PUT' || this.restServicio.getServicioWeb().metodo == 'DELETE');
    //console.log("componenteTabla",this.componenteTabla);

    this.parametroServicio.idServicioWeb = this.restServicio.getServicioWeb().id;
    this.nombreServicioWeb = this.restServicio.getServicioWeb().nombre;
    this.restParametro.listarParametroEquivalencia(this.parametroServicio).subscribe(
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
        { title: 'Orden', data: 'orden', width: "5%", className: "text-center" },
        { title: 'Nombre', data: 'parametro', width: "10%", className: "text-left" },
        { title: 'Alias', data: 'aliasColumna', width: "35%", className: "text-left" },
        { title: 'Defecto', data: 'valorFijo', defaultContent: "", width: "10%", className: "text-left" },
        { title: 'Equiv', data: 'idEquivalencia', defaultContent: "", width: "10%", className: "text-center" },
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
            if (this.componenteTabla) {
              this.router.navigate(['aplicacion/servicio/add-parametro-tabla']);
            } else {
              this.router.navigate(['aplicacion/servicio/add-parametro']);
            }
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
          self.irEliminar(this.listadoParametroServicio[index]);
        });

        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }
    };
  }

  public modificar(index) {
    this.restParametro.setParametroServicio(this.listadoParametroServicio[index]);
    this.router.navigate(['aplicacion/servicio/add-parametro']);
  }

  public irEliminar(parametroServicio) {
    this.alerta.confirmarEliminar(
      ("¿Está seguro de eliminar el servicio [" + parametroServicio.parametro + "]?"),
      () => this.eliminar(parametroServicio)
    );
  }

  public eliminar(parametroServicio) {
    parametroServicio.registradoPor = this.usuarioVO.oid;
    this.restParametro.eliminarParametroServicio(parametroServicio).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
          () => this.router.navigate(['aplicacion/servicio/lis-parametro'])
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
}