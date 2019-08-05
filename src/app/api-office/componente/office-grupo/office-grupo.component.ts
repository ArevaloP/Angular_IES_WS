import { Component, OnInit, ViewChild } from '@angular/core';
import { RestGrupoService } from '../../servicio/rest-grupo.service';
import { UtilConstante } from '../../../aplicacion/modelo/util-contante';
import { VentanaModalComponent } from '../../../aplicacion/componente/utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-office-grupo',
  templateUrl: './office-grupo.component.html',
  styleUrls: ['./office-grupo.component.scss']
})
export class OfficeGrupoComponent implements OnInit {

  private listaMienbrosGrupo: any;

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;


  private dataTable: any;
  private dtOptions: any = {}// DataTables.Settings = {};
  private const: UtilConstante = new UtilConstante();

  constructor(
    private restGrupoService: RestGrupoService,
    private router: Router
    ) { }


  ngOnInit() {
    //this.obtenerInformacionGrupo();
    this.cargarMiembrosGrupo();
  }


  public cargarMiembrosGrupo() {

    this.restGrupoService.obtenerMiembrosGrupo().subscribe(
      data => {
        console.log(data);
        this.listaMienbrosGrupo = data.value;
        this.establecerOpcionesDataTable(data.value)
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);

      },
      error => {
        console.error(error);
      }
    )

  }

  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Codigo', data: 'displayName', width: "20%", className: "text-left" },
        { title: 'Nombre', data: 'userPrincipalName', width: "40%", className: "text-left" },
        //{ title: 'Tipo', data: 'id', width: "20%" ,className: "text-left" },
        //{ title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR, orderable: false, className: "td-center" }
      ],

      paging: true,
      ordering: true,
      info: true,
      dom: 'Bfrtip',
      retrieve: true,
      buttons: [
        {
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            this.irAgregar();
          },
        },
        { extend: 'copy', "text": 'Export', className: `${this.const.CLASE_COPIAR}` },
        { extend: 'excel', "text": 'Export', className: `${this.const.CLASE_EXCEL}` }
      ],


      rowCallback: (row: Node, dataRow: any, index: number) => {
        const self = this;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          //self.modificar(index);
        });

        $('td:eq(3)', row).unbind('click');
        $('td:eq(3)', row).bind('click', () => {
          self.irEliminar(this.listaMienbrosGrupo[index]);
        });

        this.cambiarEstiloBotones();
        return row;
      }


    };


  }



  public irAgregar() {
    this.alerta.irAgregarVentana(
      ("¿ Esta seguro de eliminar el usuario   ?"),
      (correo) => this.irValidarUsuario(correo)
    );
  }


  public irEliminar(member) {
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar el usuario [" + member.userPrincipalName + "]  ?"),
      () => this.eliminarMiembrosGrupo(member)
    );
  }



  public irValidarUsuario(correo) {
    //lert(correo);
    this.restGrupoService.obtenerInformacionUsuario(correo).subscribe(
      data => {
        //alert(JSON.stringify(data));
        this.agregarMiembrosGrupo(data); 
      },
      error => {
        this.alerta.mostrarError(error);
      }

    )
  }



  public cambiarEstiloBotones() {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
  }



  public obtenerInformacionGrupo() {

    this.restGrupoService.obtenerInformacionGrupo().subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )

  }

  public agregarMiembrosGrupo(member) {

    //let usuarioID = member.id;
    this.restGrupoService.agregarMiembrosGrupo(member.id).subscribe(
      data => {
        this.router.navigateByUrl('api-office', { skipLocationChange: true }).then(() =>
          this.router.navigate(['api-office/grupo']));
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )

  }


  public eliminarMiembrosGrupo(member) {
    //let usuarioID = "08297a24-0d3d-419a-8d3f-9b906e9e930d";
    this.restGrupoService.eliminarMiembrosGrupo(member.id).subscribe(
      data => {
        this.router.navigateByUrl('api-office', { skipLocationChange: true }).then(() =>
          this.router.navigate(['api-office/grupo']));
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }


}
