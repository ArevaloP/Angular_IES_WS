import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { Router } from '@angular/router';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

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


  private dataTable: any;
  private dtOptions: DataTables.Settings = {};
  private listadoServicioWeb: ServicioWeb[];

  constructor(
    private restServicio: RestServicioWebService,
    private router: Router
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
        alert("Error en la consultad de aplicaccin " + JSON.stringify(error));
      }
    );

  }




  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: '<a class="update"><i class="fa fa-circle-o" aria-hidden="true"></i></a>', orderable: false, className: "centerm" },
        { title: 'Codigo', data: 'codigo', width: "20%" },
        { title: 'Nombre', data: 'nombre', width: "20%" },
        { title: 'Tipo', data: 'tipo', width: "20%" },
        { title: 'Metodo', data: 'metodo', width: "20%" },
        { title: '', defaultContent: '<a class="update"><i class="fa fa-pencil-square-o" style="color:blue" aria-hidden="true"></i></a>', orderable: false, className: "centerm" },
        { title: '', data: null, defaultContent: '<a class="eliminar"><i class="fa fa-trash-o" style="color:red" aria-hidden="true"></i></a>', orderable: false, className: "centerm" }

      ],
      "paging": true,
      "ordering": true,
      "info": true,

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
    servicioWeb.registradoPor = "usua_";
    this.restServicio.eliminarServicioWeb(servicioWeb).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/servicioWeb']));
      },
      error => {
        this.alerta.mostrarError(error.error);
      }
    );
  }







}
