import { Component, OnInit, ViewChild } from '@angular/core';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';
import { RestParametroArrayService } from '../../../servicio/rest-parametro-array.service';
import { ListaParametro } from '../../../modelo/lista-parametro';
import { UtilConstante } from '../../../modelo/util-contante';

@Component({
  selector: 'app-lis-parametro-array',
  templateUrl: './lis-parametro-array.component.html',
  styleUrls: ['./lis-parametro-array.component.scss']
})
export class LisParametroArrayComponent implements OnInit
{
  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public dataTable: any;
  public dtOptions: any = {}
  public listaParametros: ListaParametro[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  
  constructor(
    public restParametroArray: RestParametroArrayService,
    public router: Router
  ) { }

  ngOnInit()
  {
    this.restParametroArray.setListaParametro(null);
    this.listarListaParametros();
  }

  public listarListaParametros()
  {
    this.restParametroArray.listarParametros().subscribe(
      data => {
        this.listaParametros = data;
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

  public establecerOpcionesDataTable(data)
  {
    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Código', data: 'codigo', width: "24%", className: "text-left" },
        { title: 'Nombre', data: 'nombre', width: "60%", className: "text-left" },
        { title: 'Estado', data: 'estado', width: "10%" ,className: "text-center"},
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR, orderable: false, className: "td-center" }
      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      order: [[2, 'asc']],
      dom: 'Bfrtip',
      buttons: [
        {
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            this.router.navigate(['aplicacion/parametros-array/add-parametro-array']);
          },
        },
        { extend: 'copy', "text": 'Export', className: `${this.const.CLASE_COPIAR}` },
        { extend: 'excel', "text": 'Export', className: `${this.const.CLASE_EXCEL}` }
      ],
      rowCallback: (row: any, dataRow: ListaParametro, index: number) => {
        const self = this;

        index = row._DT_RowIndex;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(4)', row).unbind('click');
        $('td:eq(4)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(5)', row).unbind('click');
        
        if(dataRow.asociado!="1"){
          $('td:eq(5)', row).html(this.const.ICONO_ELIMINAR_ROJO);
        }

        $('td:eq(5)', row).bind('click', () => {
          self.irEliminar(this.listaParametros[index]);
        });
        
        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }
    };
  }

  public modificar( index )
  {
    this.restParametroArray.setListaParametro(this.listaParametros[index]);
    this.router.navigate(['aplicacion/parametros-array/add-parametro-array']);
  }

  public irEliminar( listaParametro )
  {
    this.alerta.confirmarEliminar(
      ("¿Esta seguro de eliminar la lista de parámetros [" + listaParametro.nombre + "]?"),
      () => this.eliminar(listaParametro)
    );
  }

  public eliminar( listaParametro )
  {
    listaParametro.registradoPor = this.usuarioVO.oid;;
    this.restParametroArray.eliminarListaParametros(listaParametro).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/parametros-array/lis-parametro-array']));
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