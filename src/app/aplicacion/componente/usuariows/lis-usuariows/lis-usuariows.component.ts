import { Component, OnInit, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-lis-usuariows',
  templateUrl: './lis-usuariows.component.html',
  styleUrls: ['./lis-usuariows.component.scss']
})
export class LisUsuariowsComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  listaUsuarioServicio:UserWebService[];

  constructor(
      private restUsuario: RestUserWebService,
      private router: Router
  ) { }

  ngOnInit() {
    this.restUsuario.setUserWebService(null);
    this.listadoUsuarioServicioWed();

  }




  public  listadoUsuarioServicioWed() {
    this.restUsuario.listarUsuarioServicioWeb().subscribe(
      data => {
        console.log(data);
        this.listaUsuarioServicio=data;
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
        { title: 'Id', data: 'id' },
        { title: 'Nombre', data: 'usuario' },
        { title: 'Correo', data: 'usuario' },
        { title: 'Usuario', data: 'usuario' },
        { title: '', data: null, defaultContent: '<a class="eliminar"><i class="fa fa-chevron-right"></a>' }

      ],
      "paging": true,
      "ordering": true,
      "info": true,

      rowCallback: (row: Node, dataRow: UserWebService, index: number) => {
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
    }

  };



  public modificar(index) {
    alert("modificar" + index);
    this.restUsuario.setUserWebService(this.listaUsuarioServicio[index]);
    this.router.navigate(['aplicacion/add-usuariows']);


  }

  public eliminar(index) {
    alert("eliminar:" + index);
    this.listaUsuarioServicio[index].registradoPor = "usua_";
    this.restUsuario.eliminarUserWebService(this.listaUsuarioServicio[index]).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
        this.router.navigate(['aplicacion/usuarioWs']));
      },
      error => {
        alert("Error en la consultad de aplicaccin " + JSON.stringify(error));
      }
    );
  }


}
