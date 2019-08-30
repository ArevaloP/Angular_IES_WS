import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RestEjecucionService } from '../../../servicio/rest-ejecucion.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';
import { UserWebService } from '../../../modelo/user-web-service';

@Component({
  selector: 'app-ejec-usuariows',
  templateUrl: './ejec-usuariows.component.html',
  styleUrls: ['./ejec-usuariows.component.scss']
})
export class EjecUsuariowsComponent implements OnInit {

  constructor(public restEjecucionService: RestEjecucionService) { }
  
  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @Input() userWebService: UserWebService;

  public dataTable: any;
  public dtOptions: any ={}//DataTables.Settings = {};
  public const: UtilConstante = new UtilConstante();

  ngOnInit() {
    this.listarEjecucionUsuario()
  }


  listarEjecucionUsuario(){
    this.restEjecucionService.listarEjecucionXusuario(this.userWebService.id).subscribe(
      data=>{
        
        this.establecerOpcionesDataTable(data);
        this.cambiarEstiloBotones();
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      },
      error=>{
        this.alerta.mostrarError(error);
      }
    );
    
  }




  public establecerOpcionesDataTable(data) {

    this.dtOptions = {
      data: data,
      columns: [

        { title: 'Fecha', data: 'fechaEjecucionText' ,  width: "25%"},
        { title: 'Aplicación', data: 'aplicacionExternaVO.codigo',  width: "15%" },
        { title: 'Servicio', data: 'webServiceVO.nombre' ,  width: "50%"},
        { title: 'Método', data: 'webServiceVO.metodo' ,  width: "10%"},

      ],
      language: {
				url: "assets/spanish.json"
			},
      paging: true,
      ordering: true,
      info: true,
      dom: 'Bfrtip',
      buttons: [
        /*{
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            //this.router.navigate(['aplicacion/add-usuariows']);
          },
        },*/
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],
      rowCallback: (row: Node, dataRow: any, index: number) => {
        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }
    }

  };

  public cambiarEstiloBotones() {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
  }
}