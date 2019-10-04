import { Component, OnInit, ViewChild } from '@angular/core';


import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UtilConstante } from '../../../modelo/util-contante';
import { Router, ActivatedRoute } from '@angular/router';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-lis-sub-parametro',
  templateUrl: './lis-sub-parametro.component.html',
  styleUrls: ['./lis-sub-parametro.component.scss']
})
export class LisSubParametroComponent implements OnInit {

  @ViewChild("dataTable", null) table;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  


  public dataTable: any;
  public dtOptions: any = {}// DataTables.Settings = {};
  public const: UtilConstante = new UtilConstante();
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listadoSubParametroServicio: ParametroServicio[];
  public servicioWeb: ServicioWeb;
  public subParametroServicio: ParametroServicio;
  public nombreServicioWeb: String;
  public nombreParametro: String;
  public listaGeneralTemp: ParametroServicio[];
  
  constructor(
    public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subParametroServicio = this.restParametro.getParametroServicio();
    this.nombreServicioWeb = "-";
    this.listarSubParametroServicio();
  }


  public listarSubParametroServicio()
  {
    this.nombreServicioWeb = this.restServicio.getServicioWeb().nombre;
    this.nombreParametro = this.restParametro.getParametroServicio().parametro+" - "+this.restParametro.getParametroServicio().aliasColumna;
    this.listadoSubParametroServicio = this.subParametroServicio.listaArray;
    this.establecerOpcionesDataTable( this.subParametroServicio.listaArray );
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }

  public establecerOpcionesDataTable( data )
  {
    this.dtOptions = {
      data: data,
      columns: [
        { title: 'Orden', data: 'orden', width: "5%", className: "text-center" },
        { title: 'Nombre', data: 'parametro', width: "10%", className: "text-left" },
        { title: 'Alias', data: 'aliasColumna', width: "35%", className: "text-left" },
        { title: 'Defecto', data: 'valorFijo', defaultContent: "", width: "10%", className: "text-left" },
        { title: 'Equiv', data: 'idEquivalencia', defaultContent: "", width: "7%", className: "text-center" },
        { title: 'Array', defaultContent: '', orderable: false, width: "7%", className: "td-center" },
        { title: '', defaultContent: this.const.ICONO_MODIFICAR, orderable: false, className: "td-center" },
        { title: '', defaultContent: '', orderable: false, className: "td-center" }
      ],
      language: {
        url: "assets/spanish.json"
      },
      paging: true,
      ordering: true,
      info: true,
      dom: 'Bfrtip',
      order: [[0, 'asc']],
      buttons: [
        {
          text: '<i class="fa fa-arrow-left fa-1_5x" aria-hidden="true" title="Volver"></i>',
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            this.volver();
          },
        },
        {
          text: `${this.const.ICONO_AGREGAR}`,
          className: `${this.const.CLASE_AGREGAR}`,
          action: () => {
            this.restParametro.setSubParametroServicio(null);
            this.router.navigate(['aplicacion/sub-parametro/add-sub-parametro']);
          },
        },
        {
          text: `${this.const.ICONO_AGREGARXLS}`,
          className: `${this.const.CLASE_AGREGARXLS}`,
          action: () => {
            this.cargarArchivoXls();
          },
        },
        { extend: 'copy', "text": 'Export', className: `${this.const.CLASE_COPIAR}` },
        { extend: 'excel', "text": 'Export', className: `${this.const.CLASE_EXCEL}` }
      ],
      rowCallback: (row: any, dataRow: ParametroServicio, index: number) => {
        const self = this;
        index = row._DT_RowIndex;

        $('td:eq(4)', row).unbind('click');
        if (dataRow.idEquivalencia) {
          $('td:eq(4)', row).html('<i class="fa fa-random" style="font-size:16px; color:orange" aria-hidden="true"></i>');
        }
        
        $('td:eq(5)', row).unbind('click');
        if (dataRow.tipoDato=='ARRAY') {
          $('td:eq(5)', row).html('<i class="fa fa-list-ol" style="font-size:16px; color:firebrick"  aria-hidden="true"></i>');
          $('td:eq(5)', row).bind('click', () => {
            if(dataRow.idListaPadre){
              self.irSubParametro(index);
            }else{
              this.alerta.mostarAdvertencia("Advertencia","Este parámetro es de tipo ARRAY , pero aun no ha seleccionado ningún listado de sub-parametros, ingrese por la opción modificar y revise la configuración");
            } 
          });
        }

        $('td:eq(6)', row).unbind('click');
        $('td:eq(6)', row).bind('click', () => {
          self.modificar(index);
        });

        $('td:eq(7)', row).unbind('click');
        if ( !dataRow.listaArray )
        {
          $('td:eq(7)', row).html(this.const.ICONO_ELIMINAR);
          $('td:eq(7)', row).bind('click', () => {
            self.irEliminar(this.listadoSubParametroServicio[index]);
          });
        }

        return row;
      },
      initComplete: (settings, json) => {
        this.cambiarEstiloBotones();
      }
    };
  }

  // Función que hace un llamado recursivo a este componente.
  public irSubParametro( index )
  {
    this.restParametro.setParametroServicio(this.listadoSubParametroServicio[index]);
    this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
      () => this.router.navigate(['aplicacion/parametro/lis-sub-parametro'])
    );
  }

  public modificar(index) {
    this.restParametro.setSubParametroServicio(this.listadoSubParametroServicio[index]);
    this.router.navigate(['aplicacion/sub-parametro/add-sub-parametro']);
  }

  public irEliminar(subParametroServicio) {
    
    this.alerta.confirmarEliminar(
      ("¿Está seguro de eliminar el parámetro [" + subParametroServicio.parametro + "]?"),
      () => this.eliminar(subParametroServicio)
    );
  }



  public eliminar(subParametroServicio) {
    subParametroServicio.registradoPor = this.usuarioVO.oid;
    this.restParametro.eliminarParametroServicio(subParametroServicio).subscribe(
      data => {
        this.recargarParametro();
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



  public cargarArchivoXls() {
    this.alerta.agregarParametroArrayXlsVentana(
      this.servicioWeb,
      () => this.listarParametroServicio()
    );
  }

  public listarParametroServicio()
  {
    let parametroServicio: ParametroServicio = new ParametroServicio();
    parametroServicio.idServicioWeb = this.restServicio.getIdServicio();
    this.restParametro.listarParametroEquivalencia(parametroServicio).subscribe(
      data => {
        this.restParametro.setListaParametroGeneral(data);
        // Ya que el objeto no trae los idListaAsociado al momento de agregarlos por archivo adjunto.
        this.restParametro.setSubParametroServicio( this.recargarObjExcel(data) );
        this.recargarParametro();
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

  // Función que busca en la lista (array que contiene la estructura global de los parámetros) el objeto
  // en el que estamos ubicados actualmente, ya que este contiene los idListaAsociado
  // que se necesitan para la acción "volver".
  public recargarObjExcel( listaGeneral: ParametroServicio[] )
  {
    let parametroServicio = listaGeneral.find( parametroServicio => {
      return parametroServicio.id === this.subParametroServicio.id;
    });

    if ( !parametroServicio )
    {
      for ( let j = 0; j < listaGeneral.length; j++ )
      {
        if ( listaGeneral[j].listaArray )
        {
          // Llamado recursivo para buscar en su lista de subparámetros.
          parametroServicio = this.recargarObjExcel( listaGeneral[j].listaArray );

          if ( parametroServicio )
            break;
        }
      }
    }

    return parametroServicio;
  }

  public async recargarListado() {
    if(this.restParametro.getRespuesta()){
      this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
        () => this.router.navigate(['aplicacion/parametro/lis-sub-parametro'])
      );
    }else{
      this.alerta.mostrarError(this.restParametro.getInfoData());
    } 
  }

  // Función que refresca los datos de la lista desde donde se le suprimió un objeto. También es útil para el
  // proceso de agregar los parámetros por archivo excel.
  public recargarParametro()
  {
    this.restParametro.recargarParametro( this.restParametro.getParametroServicio() ).subscribe(
      data => {
        this.restParametro.setParametroServicio( data );

        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
          () => this.router.navigate(['aplicacion/parametro/lis-sub-parametro/1'])
        );
      },
      error => {
        let mensaje = "Su proceso se ha realizado correctamente, aunque hay inconvenientes al recargar su información. Por favor ingrese a la funcionalidad nuevamente.<br>";
        
        if ( error.error.mensaje )
          error.error.mensaje = mensaje + error.error.mensaje;
        else if ( error.message )
          error.message = mensaje + error.message;
        else
          error.message = mensaje;
        
        this.alerta.mostrarError(error);
      }
    );
  }

  // Función que busca el parámetro padre para renderizar este mismo componente con los datos del parámetro anterior,
  // generando el efecto de volver a través del navegador.
  public volver()
  {
    if ( this.subParametroServicio.idListaAsociado )
    {
      let modificado = this.activatedRoute.snapshot.paramMap.get('modificado');
      // Si no se ha modificado ni agregado registros, no es necesario actualizar el array global de parámetros.
      this.restParametro.setParametroServicio( 
        this.buscarPadre( this.restParametro.getListaParametroGeneral(), this.subParametroServicio.idListaAsociado, modificado )
      );
      
      this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
        () => this.router.navigate(['aplicacion/parametro/lis-sub-parametro'])
      );
    }
    else
      this.router.navigate(['aplicacion/servicio/lis-parametro']);
  }

  public buscarPadre( listaParametros: ParametroServicio[], idHijo, mod )
  {
    let objetoBuscar = listaParametros.find( parametroServicio => {
      return idHijo === parametroServicio.idListaPadre;
    });

    if ( objetoBuscar )
    {
      if ( "1" == mod ) // actualiza en el array global el objeto afectado o modificado.
        this.actualizarEnListaGeneral( listaParametros );
    }
    else {
      for ( let j = 0; j < listaParametros.length; j++ )
      {
        let parametroServicio = listaParametros[j];
        
        if ( parametroServicio.listaArray )
        {
          // Llamado recursivo para buscar en su lista de subparámetros.
          objetoBuscar = this.buscarPadre( parametroServicio.listaArray, idHijo, mod );
          
          if ( objetoBuscar )
            break;
        }
      }
    }
    
    return objetoBuscar;
  }

  // Función que reemplaza en lista el objeto recargado por acciones hechas por el usuario.
  public actualizarEnListaGeneral( listaParametros: ParametroServicio[] )
  {
    let indice;
    let parametroServicio = null;
    
    for ( let j = 0; j < listaParametros.length; j++ )
    {
      
      if ( listaParametros[j].listaArray )
      {
        parametroServicio = listaParametros[j].listaArray.find( (objHijo, index) => {
          indice = index;
          return objHijo.id === this.restParametro.getParametroServicio().id;
        });
      }
      
      if ( parametroServicio )
      {
        listaParametros[j].listaArray[indice] = this.restParametro.getParametroServicio();
        break;
      }
    }
  }
}