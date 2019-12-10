import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestEquivalenciaService } from '../../../servicio/rest-equivalencia.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';
import { UtilConstante } from '../../../modelo/util-contante';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { RestDetalleEquivalenciaService } from '../../../servicio/rest-detalle-equivalencia.service';

@Component({
  selector: 'app-lis-equivalencia',
  templateUrl: './lis-equivalencia.component.html',
  styleUrls: ['./lis-equivalencia.component.scss']
})
export class LisEquivalenciaComponent implements OnInit
{
  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public dataTable: any;
  public dtOptions: any = {};
  public listaEquivalencias: AtributoEquivalencia[];
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));

  constructor(
    public router: Router,
    public restEquivalencia: RestEquivalenciaService,
    public restConexion: RestJdbcConexionService,
    public restDetalleEq: RestDetalleEquivalenciaService
  ) { }

  ngOnInit()
  {
    this.restEquivalencia.setEntidadEquivalencia( null );
    this.listarEntidades();
  }

  cargarAgregar(){
    this.router.navigate(['aplicacion/equivalencia/add-equivalencia']);
  }

  public listarEntidades()
  {
    this.restConexion.setListaConexiones( null );
    this.restEquivalencia.listarEntidades().subscribe(
      data => {
        this.listaEquivalencias = data;
        this.establecerOpcionesDataTable(data);
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
        this.listarConexiones();
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public establecerOpcionesDataTable( data )
  {
    this.dtOptions = {
      data: data,
      columns: [
        { title: '', defaultContent: this.const.ICONO_VER, orderable: false, className: "td-center" },
        { title: 'Nombre', data: 'nombre', width: "35%" },
        { title: 'Entidad', defaultContent: '', data: 'entidad', width: "20%" },
        { title: 'Descripción', defaultContent: '', data: 'descripcion', width: "39%" },
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_ELIMINAR, orderable: false, className: "td-center" }
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
            this.router.navigate(['aplicacion/equivalencia/add-equivalencia']);
          },
        },
        /*{
          text: `${this.const.ICONO_AGREGARXLS}`,
          className: `${this.const.CLASE_AGREGARXLS}`,
          action: () => {
            this.irEquivalencia();
          },
        },*/
        { "extend": 'copy', "text": 'Export', "className": `${this.const.CLASE_COPIAR}` },
        { "extend": 'excel', "text": 'Export', "className": `${this.const.CLASE_EXCEL}` }
      ],

      rowCallback: (row: any, dataRow: AtributoEquivalencia, index: number) => {
        const self = this;
        index = row._DT_RowIndex;

        $('td:eq(0)', row).unbind('click');
        $('td:eq(0)', row).bind('click', () => {
          self.modificar( index );
        });

        $('td:eq(4)', row).unbind('click');
        $('td:eq(4)', row).bind('click', () => {
          self.modificar( index );
        });

        $('td:eq(5)', row).unbind('click');
        $('td:eq(5)', row).bind('click', () => {
          self.irEliminar( this.listaEquivalencias[index] );
        });

        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }
    };
  }

  public listarConexiones()
  {
    this.restConexion.listarJdbcConexion().subscribe(
      data => {
        this.restConexion.setListaConexiones( data );
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public modificar( index )
  {
    this.restEquivalencia.setEntidadEquivalencia( this.listaEquivalencias[index] );
    this.router.navigate(['aplicacion/equivalencia/add-equivalencia']);
  }

  public irEliminar( entidadEquivalencia )
  {
    this.alerta.confirmarEliminar(
      ("¿Esta seguro de eliminar la equivalencia [" + entidadEquivalencia.nombre + "]?"),
      () => this.eliminar( entidadEquivalencia )
    );
  }

  public eliminar( entidadEquivalencia )
  {
    entidadEquivalencia.registradoPor = this.usuarioVO.oid;
    this.restEquivalencia.eliminarEntidad( entidadEquivalencia ).subscribe(
      data => {
        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
          this.router.navigate(['aplicacion/equivalencia/lis-equivalencia']));
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public cambiarEstiloBotones()
  {
    $(":button.buttons-copy").html(`${this.const.ICONO_COPIAR}`);
    $(":button.buttons-excel").html(`${this.const.ICONO_EXCEL}`);
    $(".dt-buttons").css("float", "left");
  }





  

  public irEquivalencia() {
    //alert("irEquivalencia");
    let entidadEquivalencia:AtributoEquivalencia=new AtributoEquivalencia();

    this.alerta.agregarEquivalenciaXlsVentana(
      entidadEquivalencia,
      () => this.recargarListado()
    );
  }


  public async recargarListado() {
    console.log("Respuesta:::",this.restDetalleEq.getRespuesta());
    if(this.restDetalleEq.getRespuesta()){
      this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
      this.router.navigate(['aplicacion/equivalencia/lis-equivalencia']));
    }else{
      this.alerta.mostrarError(this.restDetalleEq.getInfoData());
    } 
  }




}