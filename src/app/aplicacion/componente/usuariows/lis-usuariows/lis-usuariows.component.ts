import { Component, OnInit, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { Router } from '@angular/router';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';


declare var $;
@Component({
  selector: 'app-lis-usuariows',
  templateUrl: './lis-usuariows.component.html',
  styleUrls: ['./lis-usuariows.component.scss']
})
export class LisUsuariowsComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  private dataTable: any;
  private dtOptions: DataTables.Settings = {};
  private listaUsuarioServicio: UserWebService[];



  constructor(
    private restUsuario: RestUserWebService,
    private router: Router
  ) { }

  ngOnInit() {
    this.restUsuario.setUserWebService(null);
    this.listadoUsuarioServicioWed();
  }




  public listadoUsuarioServicioWed() {
    this.restUsuario.listarUsuarioServicioWeb().subscribe(
      data => {
        console.log(data);
        this.listaUsuarioServicio = data;
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
        { title: 'Id', data: 'id' },
        { title: 'Nombre', data: 'usuario' },
        { title: 'Correo', data: 'usuario' },
        { title: 'Usuario', data: 'usuario' },
        { title: '', defaultContent: '<a class="update"><i class="fa fa-pencil-square-o" style="color:blue" aria-hidden="true"></i></a>', orderable: false, className: "centerm" },
        { title: '', data: null, defaultContent: '<a class="eliminar"><i class="fa fa-trash-o" style="color:red" aria-hidden="true"></i></a>', orderable: false, className: "centerm" }



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
          self.modificar(index);
        });


        $('td:eq(6)', row).unbind('click');
        $('td:eq(6)', row).bind('click', () => {
          self.irEliminar(this.listaUsuarioServicio[index]);
        });

        return row;
      }
    }

  };



  public modificar(index) {
    this.restUsuario.setUserWebService(this.listaUsuarioServicio[index]);
    this.router.navigate(['aplicacion/add-usuariows']);
  }



  public irEliminar(usuarioServicio) {
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar el usuario ["+usuarioServicio.usuario+"]  ?"),
      () => this.eliminar( usuarioServicio)
    );
  }





  public eliminar(usuarioServicio) {
    usuarioServicio.registradoPor = "usua_";
    this.restUsuario.eliminarUserWebService(usuarioServicio).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/usuarioWs']));
      },
      error => {
        this.alerta.mostrarError(error.error);
      }
    );
  }

}
