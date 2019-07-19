import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';

declare var $;


@Component({
  selector: 'app-lis-aplicacion-servicio',
  templateUrl: './lis-aplicacion-servicio.component.html',
  styleUrls: ['./lis-aplicacion-servicio.component.scss']
})
export class LisAplicacionServicioComponent implements OnInit {

  @Input() listaServicio: ServicioWeb[];
  //@ HostBinding ( 'class' ) className ="box box-primary";
  @Input() searchText: String;


  //@ViewChild("dataTable", null) table;
  //private dataTable: any;
  //private dtOptions: DataTables.Settings = {};

  p: number = 1;
  constructor(
    private restServicio: RestServicioWebService,
  ) {

  }


  ngOnInit() {
    //alert(this.restServicio.getListaServicio());
    //this.establecerOpcionesDataTable(this.restServicio.getListaServicio());
  }



  /*public establecerOpcionesDataTable(data) {

    //alert(JSON.stringify(data));
    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: '' },
        { title: 'Codigo', data: 'codigo' },
        { title: 'Nombre', data: 'nombre' },
        { title: 'Metodo', data: 'metodo' },
        { title: '', data: null, defaultContent: '<label class="switch switch-3d switch-success"> <input type="checkbox" class="switch-input" id="idServicio" name="idServicio" [(ngModel)]="wese.checkeado"  > <span class="switch-slider"></span> </label>' }

      ],
      "paging": true,
      "ordering": true,
      "info": true,

      rowCallback: (row: Node, dataRow: ServicioWeb, index: number) => {
        const self = this;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          //self.modificar(index);
        });
        $('td:eq(4)', row).unbind('click');
        $('td:eq(4)', row).bind('click', () => {
            
           console.log($( this ).data());
          
            self.actualizarEstadoServicio(index,true)
        });
        //alert("index"+JSON.stringify(dataRow));
        //$('td:eq(1)', row).html("<img src='"+dataRow.uswsImagen+"' class='img-circle' width='40' height='40' >");
        return row;
      }

    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }*/




  private actualizarEstadoServicio(index: number, eve: any) {

    //alert(""+index+" =>"+eve);
    this.listaServicio[index].checkeado = eve;
    this.listaServicio[index].registradoPor = "reg_";
    this.listaServicio[index].usuarioRealiza = "code_";
    if (this.listaServicio[index].idAplicacion!="-1") {
      if (eve) {
        this.restServicio.actualizarEstadoServicioAplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
          }
        );
      } else if (!eve) {

        this.restServicio.eliminarServicioWebXaplicacion(this.listaServicio[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaServicio[index].checkeado = !eve;
          }
        );
      }
    }
  }


}
