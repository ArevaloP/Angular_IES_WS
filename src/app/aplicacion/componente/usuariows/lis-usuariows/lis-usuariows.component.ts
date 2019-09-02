import { Component, OnInit, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { Router } from '@angular/router';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import {  UtilConstante } from '../../../modelo/util-contante';


declare var $;
@Component({
  selector: 'app-lis-usuariows',
  templateUrl: './lis-usuariows.component.html',
  styleUrls: ['./lis-usuariows.component.scss']
})
export class LisUsuariowsComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public dataTable: any;
  public dtOptions: any ={}//DataTables.Settings = {};
  public listaUsuarioServicio: UserWebService[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));

  constructor(
    public restUsuario: RestUserWebService,
    public router: Router
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
        this.cambiarEstiloBotones();
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }




  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [

        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Avatar', defaultContent: "",  width: "10%"},
        { title: 'Nombre', data: 'nombre' ,  width: "30%"},
        { title: 'Correo', data: 'email',  width: "30%" },
        { title: 'Usuario', data: 'usuario' ,  width: "20%"},
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
            this.router.navigate(['aplicacion/privilegio/add-usuariows']);
          },
        },
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],
      rowCallback: (row: any, dataRow: UserWebService, index: number) => {
        const self = this;
        index =row._DT_RowIndex;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.modificar(index);
        });


        //$('td:eq(1)', row).html("<img src='"+dataRow.imagen+"' class='img-circle' >");
        $('td:eq(1)', row).unbind('click');
        $('td:eq(1)', row).html("<div class='column'><img class='img-circle-40' src='"+(dataRow.imagen||'/assets/img/avatars/no-disponible.png')+"' /></div>");
        $('td:eq(1)', row).bind('click', () => {
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
        //this.cambiarEstiloBotones();
        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }


    }

  };



  public modificar(index) {
    this.restUsuario.setUserWebService(this.listaUsuarioServicio[index]);
    this.router.navigate(['aplicacion/privilegio/add-usuariows']);
  }



  public irEliminar(usuarioServicio) {
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar el usuario [" + usuarioServicio.usuario + "]  ?"),
      () => this.eliminar(usuarioServicio)
    );
  }





  public eliminar(usuarioServicio) {
    usuarioServicio.registradoPor = this.usuarioVO.oid;;
    this.restUsuario.eliminarUserWebService(usuarioServicio).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/privilegio/usuarioWs']));
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
