import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { Router } from '@angular/router';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';

declare var $;


@Component({
  selector: 'app-lis-servicio-web',
  templateUrl: './lis-servicio-web.component.html',
  styleUrls: ['./lis-servicio-web.component.scss']
})


//https://jsonplaceholder.typicode.com/users
export class LisServicioWebComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;


  public dataTable: any;
  public dtOptions: any={}// DataTables.Settings = {};
  public listadoServicioWeb: ServicioWeb[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));

  constructor(
    public restServicio: RestServicioWebService,
    public router: Router
  ) {
  }


  ngOnInit() {
    this.restServicio.setServicioWeb(null);
    this.listadoServiciosWeb();

  }


  public listadoServiciosWeb() {
    this.restServicio.listarServicioWeb().subscribe(
      data => {
        console.log(data);
        this.listadoServicioWeb = data;
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
        { title: 'Código', data: 'codigo', width: "20%", className: "text-left" },
        { title: 'Nombre', data: 'nombre', width: "40%" ,className: "text-left" },
        { title: 'Tipo', data: 'tipo', width: "20%" ,className: "text-left" },
        { title: 'Método', data: 'metodo', width: "20%" },
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR,  orderable: false, className: "td-center" }

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
            this.router.navigate(['aplicacion/add-servicioweb']);
          },
        },
        { extend: 'copy', "text": 'Export', className: `${this.const.CLASE_COPIAR}` },
        { extend: 'excel', "text": 'Export', className: `${this.const.CLASE_EXCEL}` }
      ],


      rowCallback: (row: Node, dataRow: ServicioWeb, index: number) => {
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
          self.irEliminar(this.listadoServicioWeb[index]);
        });
        this.cambiarEstiloBotones();
        return row;
      }


    };


  }



  public modificar(index) {
    this.restServicio.setServicioWeb(this.listadoServicioWeb[index]);
    this.router.navigate(['aplicacion/add-servicioweb']);
  }

  public irEliminar(servicioWeb) {
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar el servicio [" + servicioWeb.nombre + "]  ?"),
      () => this.eliminar(servicioWeb)
    );
  }



  public eliminar(servicioWeb) {
    servicioWeb.registradoPor = this.usuarioVO.oid;;
    this.restServicio.eliminarServicioWeb(servicioWeb).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/servicioWeb']));
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
