import { Component, OnInit, ViewChild } from '@angular/core';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { ImplementacionClase } from '../../../modelo/implementacion-clase';
import { UtilConstante } from '../../../modelo/util-contante';
import { RestImplementacionClaseService } from '../../../servicio/rest-implementacion-clase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lis-clase',
  templateUrl: './lis-clase.component.html',
  styleUrls: ['./lis-clase.component.scss']
})
export class LisClaseComponent implements OnInit {


  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  public dataTable: any;
  public dtOptions: any = {};
  public listadoClaseImp: ImplementacionClase[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));



  constructor(
    public restImplementacion: RestImplementacionClaseService,
    public router: Router,

  ) { }

  ngOnInit() {
    this.restImplementacion.setImplementacionClase(null);
    this.listadoCodnexiones();
  }




  public listadoCodnexiones() {

    this.restImplementacion.listarImplementacionClase(null).subscribe(
      data => {
        console.log(data);
        this.listadoClaseImp = data;
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
        { title: 'Código', data: 'codigo', width: "10%" },
        { title: 'Nombre', data: 'nombre', width: "20%" },
        { title: 'Tipo', data: 'tipoServicio', width: "10%" },
        { title: 'Clase', data: 'clase', width: "35%" },
        { title: 'Estado', data: 'estado', width: "7%" },
        { title: 'Lib', defaultContent: '', width: "8%",  className: "td-center"},
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
            this.router.navigate(['aplicacion/interfaz/add-clase']);
          },
        },
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],

      rowCallback: (row: any, dataRow: ImplementacionClase, index: number) => {
        const self = this;
        index = row._DT_RowIndex;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(6)', row).unbind('click');
        if(dataRow.libreriaDinamica){
          $('td:eq(6)', row).html('<a href="'+dataRow.rutaLibreria+'" download><i class="fa fa-file-archive-o" style="font-size: 17px" aria-hidden="true"></i></a>');
        }

        $('td:eq(7)', row).unbind('click');
        $('td:eq(7)', row).bind('click', () => {
          self.modificar(index);
        });

        

        $('td:eq(8)', row).unbind('click');
        $('td:eq(8)', row).bind('click', () => {
          self.irEliminar(this.listadoClaseImp[index]);
        });
        //this.cambiarEstiloBotones();
        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }


    };


  }




  public modificar(index) {
    this.restImplementacion.setImplementacionClase(this.listadoClaseImp[index]);
    this.router.navigate(['aplicacion/interfaz/add-clase']);
  }

  public irEliminar(implementaClase) {
    this.alerta.confirmarEliminar(
      ("¿ Esta seguro de eliminar la conexión [" + implementaClase.nombre + "]  ?"),
      () => this.eliminar(implementaClase)
    );
  }



  public eliminar(implementaClase) {
    implementaClase.registradoPor = this.usuarioVO.oid;
    this.restImplementacion.eliminarImplementacionClase(implementaClase).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/interfaz/lis-clase']));
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
