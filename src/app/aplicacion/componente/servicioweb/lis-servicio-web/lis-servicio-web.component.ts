import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $;


@Component({
  selector: 'app-lis-servicio-web',
  templateUrl: './lis-servicio-web.component.html',
  styleUrls: ['./lis-servicio-web.component.scss']
})


//https://jsonplaceholder.typicode.com/users
export class LisServicioWebComponent implements OnInit {

  @ViewChild("dataTable", null) table;
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
        { title: '<i class="fas fa-plus"></i>', defaultContent: '<a class="update"><i class="fa fa-chevron-right"></a>' },
        { title: 'Codigo', data: 'codigo' },
        { title: 'Nombre', data: 'nombre' },
        { title: 'Tipo', data: 'tipo' },
        { title: 'Metodo', data: 'metodo' },
        { title: '', data: null, defaultContent: '<a class="eliminar"><i class="fa fa-chevron-right"></a>' }

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
          self.eliminar(index);
        });
        //alert("index"+JSON.stringify(dataRow));
        //$('td:eq(1)', row).html("<img src='"+dataRow.uswsImagen+"' class='img-circle' width='40' height='40' >");
        return row;
      }


    };


  }



  public modificar(index) {
    
    
    this.restServicio.setServicioWeb(this.listadoServicioWeb[index]);
    this.router.navigate(['aplicacion/add-servicioweb']);

  }

  public eliminar(index) {
    alert("eliminar:" + index);
    this.listadoServicioWeb[index].registradoPor = "usua_";
    this.restServicio.eliminarServicioWeb(this.listadoServicioWeb[index]).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
        this.router.navigate(['aplicacion/servicioWeb']));
      },
      error => {
        alert("Error en la consultad de aplicaccin " + JSON.stringify(error));
      }
    );
  }







}
