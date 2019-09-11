import { Component, OnInit, ViewChild } from '@angular/core';
import { DetalleEjecucion } from '../../../modelo/detalle-ejecucion';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';
import { Router } from '@angular/router';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';

@Component({
  selector: 'app-lis-ejedetalle',
  templateUrl: './lis-ejedetalle.component.html',
  styleUrls: ['./lis-ejedetalle.component.scss']
})
export class LisEjedetalleComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  
  public dataTable: any;
  public dtOptions: any= {};
  public listadoEjecucionServicio: DetalleEjecucion[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  


  constructor(
    public restDetalleEjecucion: RestUserWebService,
    public router: Router,


  ) { }

  ngOnInit() {
    this.listadoCodnexiones();
  }



  public listadoCodnexiones() {

    this.restDetalleEjecucion.listarDetalleEjecucion().subscribe(
      data => {
        console.log(data);
        this.listadoEjecucionServicio = data;
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
        { title: 'Fecha', data: 'fechaEjecucion', width: "10%" },
        { title: 'Código', data: 'codigoAplicacion', width: "7%" },
        { title: 'Aplicación', data: 'nombreAplicacion', width: "25%" },
        { title: 'Código', data: 'servicioCodigo', width: "10%" },
        { title: 'Servicio', data: 'servicioNombre', width: "25%" },
        { title: 'Tipo', data: 'tipoProtocolo', width: "7%", className: "text-center"  },
        { title: 'Tipo', data: 'servicioTipoIngreso', width: "8%" },
        { title: 'Usuario', data: 'usuario', width: "15%" },
        //{ title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        //{ title: '', defaultContent: this.const.ICONO_ELIMINAR,  orderable: false, className: "td-centerm" }

      ],
      language: {
				url: "assets/spanish.json"
			},
      paging: true,
      ordering: true,
      info: true,
      order: [[1, 'desc']],
      dom: 'Bfrtip',
      buttons: [
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],

      rowCallback: (row: any, dataRow: DetalleEjecucion, index: number) => {
        const self = this;
        index =row._DT_RowIndex;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.verDetalle(index);
        });

        $('td:eq(6)', row).unbind('click');
        $('td:eq(6)', row).bind('click', () => {
          //self.modificar(index);
        });

        $('td:eq(7)', row).unbind('click');
        $('td:eq(7)', row).bind('click', () => {
          //self.irEliminar(this.listadoEjecucionServicio[index]);
        });

        this.cambiarEstiloBotones();

        return row;
      }


    };


  }




  public verDetalle(index) {
    this.restDetalleEjecucion.setDetalleEjecucion(this.listadoEjecucionServicio[index]);
    this.router.navigate(['aplicacion/detalle/ver-ejecucionws']);
  }



  public cambiarEstiloBotones() {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
  }





}
