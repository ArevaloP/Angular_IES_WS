import { Component, OnInit, ViewChild, ɵConsole, ElementRef } from '@angular/core';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { RestEquivalenciaService } from '../../../servicio/rest-equivalencia.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';
import { RestDetalleEquivalenciaService } from '../../../servicio/rest-detalle-equivalencia.service';
import { DetalleEquivalencia } from '../../../modelo/detalle-equivalencia';
import { EstructuraEntidad } from '../../../modelo/estructura-entidad';
import { AddDetalleeqComponent } from '../../detalle-equivalencia/add-detalleeq/add-detalleeq.component';
import { XlsEquivalenciaComponent } from '../xls-equivalencia/xls-equivalencia.component';

@Component({
  selector: 'app-add-equivalencia',
  templateUrl: './add-equivalencia.component.html',
  styleUrls: ['./add-equivalencia.component.scss']
})
export class AddEquivalenciaComponent implements OnInit
{
  public dataTable: any;
  public dtOptions: any = {};
  public fGeneral: FormGroup;
  public entidadEquivalencia: AtributoEquivalencia = new AtributoEquivalencia();
  public isModificar: boolean = false;
  public listaConexiones: JdbcConexion[] = null;
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public detalleEquivalencia: DetalleEquivalencia;
  public estructuraEntidad: EstructuraEntidad;
  public reRender: Boolean = true;
  public mostrar: Boolean = false;
  public urlFichero:String="";

  @ViewChild('descargarh5', { static: false }) descargarh5: ElementRef;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;


  constructor(
    public fb: FormBuilder,
    public restEquivalencia: RestEquivalenciaService,
    public restConexion: RestJdbcConexionService,
    public restDetalleEq: RestDetalleEquivalenciaService,
    public router: Router
  ) { }

  ngOnInit()
  {
    this.listaConexiones = this.restConexion.getListaConexiones();
    
    if (this.restEquivalencia.getEntidadEquivalencia() != null)
    {
      this.entidadEquivalencia = this.restEquivalencia.getEntidadEquivalencia();
      this.cargarDetalles( this.entidadEquivalencia );
      this.isModificar = true;
    } else {
      this.estructuraEntidad = new EstructuraEntidad();
      this.isModificar = false;
      this.mostrar = true;
      // this.entidadEquivalencia.entidad = "GENERAL.TIPODOCUMENTOGENERAL";
    }
    
    this.inicializarValidacion();
  }

  public inicializarValidacion()
  {
    this.fGeneral = this.fb.group({
      nombre: [this.entidadEquivalencia.nombre, Validators.required],
      entidad: [this.entidadEquivalencia.entidad],
      descripcion: [this.entidadEquivalencia.descripcion],
      conexion: [this.entidadEquivalencia.idConexionJdbc],
      nOrigen: [this.entidadEquivalencia.nOrigen],
      vOrigen: [this.entidadEquivalencia.vOrigen],
      descargar: []
    });
  }

  public cargarDetalles( entidadEquivalencia )
  {
    this.restEquivalencia.consultarDetallesEntidad( entidadEquivalencia ).subscribe(
      data => {
        this.entidadEquivalencia = data;
        this.mostrar = true;
      },
      error => {
        this.alerta.mostrarError(error);
        setTimeout( () => { 
          this.router.navigate(['aplicacion/equivalencia/lis-equivalencia']);
        }, 3000 );
      }
    );
  }

  public irRegistar()
  {
    let msj = this.validarDetalleEquivalencia();

    if ( null == msj )
    {
      this.entidadEquivalencia.registradoPor = this.usuarioVO.oid;
      this.entidadEquivalencia.usuarioRealiza = this.usuarioVO.name;
      
      if ( this.isModificar )
      {
        this.alerta.confirmarActualizar(
          ("¿Esta seguro de modificar la equivalencia [" + this.entidadEquivalencia.nombre + "]?"),
          () => this.actualizarEntidadEquivalencia(this.entidadEquivalencia)
        );
      }
      else {
        // this.entidadEquivalencia.listaDetalles = this.detalleComponent.getListaDetalles();
        this.alerta.confirmarInsertar(
          ("¿Esta seguro de agregar la equivalencia [" + this.entidadEquivalencia.nombre + "]?"),
          () => this.insertarEntidadEquivalencia(this.entidadEquivalencia)
        );
      }
    }
    else
      this.alerta.mostarAdvertencia( "Advertencia", msj );
  }

  public insertarEntidadEquivalencia( entidadEquivalencia )
  {
    this.restEquivalencia.insertarEntidad( entidadEquivalencia ).subscribe(
      data => {
        this.router.navigate(['aplicacion/equivalencia/lis-equivalencia']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }

  public actualizarEntidadEquivalencia( entidadEquivalencia )
  {
    this.restEquivalencia.actualizarEntidad( entidadEquivalencia ).subscribe(
      data => {
        this.router.navigate(['aplicacion/equivalencia/lis-equivalencia']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public cargarAtributos()
  {
    this.reRender = false;

    setTimeout(()=>{
      this.estructuraEntidad = new EstructuraEntidad();
      this.reRender = true;

      if ( this.entidadEquivalencia.idConexionJdbc )
      {
        if ( Number(this.entidadEquivalencia.idConexionJdbc.toString()) > -1 && this.entidadEquivalencia.entidad )
        {
          this.detalleEquivalencia = new DetalleEquivalencia();
          this.detalleEquivalencia.nombreEntidad = this.entidadEquivalencia.entidad;
          this.detalleEquivalencia.conexionJdbcVO = this.getObjeto( this.entidadEquivalencia.idConexionJdbc );
          
          this.restDetalleEq.consultarDetallesAtributos( this.detalleEquivalencia ).subscribe(
            data => {
              this.estructuraEntidad = data;
            },
            error => {
              this.alerta.mostrarError(error);
            }
          );
        }
        else {
          this.suprimirAutomaticas( this.entidadEquivalencia.listaDetalles, 0 );
          this.entidadEquivalencia.tagNombreOrigen = null;
          this.entidadEquivalencia.tagValorOrigen = null;
        }
      }
      else {
        this.suprimirAutomaticas( this.entidadEquivalencia.listaDetalles, 0 );
        this.entidadEquivalencia.tagNombreOrigen = null;
        this.entidadEquivalencia.tagValorOrigen = null;
      }
    }, 50);
  }

  public limpiarDetAutomaticos()
  {
    this.reRender = false;

    setTimeout(()=>{
      this.estructuraEntidad = new EstructuraEntidad();
      this.reRender = true;
      this.suprimirAutomaticas( this.entidadEquivalencia.listaDetalles, 0 );
      this.entidadEquivalencia.tagNombreOrigen = null;
      this.entidadEquivalencia.tagValorOrigen = null;
    }, 50);
  }

  public getObjeto( id )
  {
    let objeto = this.listaConexiones.find( objetoBus => {
      return objetoBus.id == id;
    });
    
    return objeto;
  }

  public suprimirAutomaticas( listaDetalles, indice )
  {
    if ( listaDetalles && listaDetalles.length > 0 )
    {
      indice = listaDetalles.findIndex( objeto => {
        return "1" == objeto.esAutomatico;
      });

      if ( -1 !== indice )
      {
        listaDetalles.splice( indice, 1 );
        this.suprimirAutomaticas( listaDetalles, indice );
      }
    }
  }

  public validarDetalleEquivalencia()
  {
    let respuesta = null;

    if ( (!this.entidadEquivalencia.listaDetalles || 0 === this.entidadEquivalencia.listaDetalles.length) 
        && (!this.entidadEquivalencia.listaDetallesCompuestos || 0 === this.entidadEquivalencia.listaDetallesCompuestos.length) )
      respuesta = "Debe gestionar al menos una de las dos pestañas de atributos.";
    else {
      if ( this.entidadEquivalencia.listaDetalles && this.entidadEquivalencia.listaDetalles.length > 0 )
      {
        this.entidadEquivalencia.listaDetalles.forEach( detalleEquivalencia => {
          if ( !detalleEquivalencia.nombreOrigen || "" == detalleEquivalencia.nombreOrigen.trim()
            || !detalleEquivalencia.valorOrigen || "" == detalleEquivalencia.valorOrigen.trim()
            || !detalleEquivalencia.nombreEquivalencia || "" == detalleEquivalencia.nombreEquivalencia.trim()
            || !detalleEquivalencia.valorEquivalente || "" == detalleEquivalencia.valorEquivalente.trim() )
          {
            respuesta = "Todos los valores correspondientes a la lista de atributos simples deben estar gestionados.";
            return false;
          }
        });
      }

      if ( !respuesta && this.entidadEquivalencia.listaDetallesCompuestos && this.entidadEquivalencia.listaDetallesCompuestos.length > 0 )
      {
        this.entidadEquivalencia.listaDetallesCompuestos.forEach( detalleEquivalencia => {
          if ( !detalleEquivalencia.nombreEquivalencia || "" == detalleEquivalencia.nombreEquivalencia.trim() 
            || !detalleEquivalencia.valorEquivalente || "" == detalleEquivalencia.valorEquivalente.trim()
            || !detalleEquivalencia.listadoCompuesto || 0 === detalleEquivalencia.listadoCompuesto.length )
          {
            respuesta = "Todos los valores correspondientes a la lista de atributos compuestos deben estar gestionados.";
            return false;
          }

          // Busca el objeto que tenga algún campo vacío.
          let atributoCompuesto = detalleEquivalencia.listadoCompuesto.find( atributoCompuesto => {
            let condicion = false;

            if ( !atributoCompuesto.nombreOrigen || "" == atributoCompuesto.nombreOrigen.trim()
              || !atributoCompuesto.valorOrigen || "" == atributoCompuesto.valorOrigen.trim() )
              condicion = true;
            
            return condicion;
          });

          if ( atributoCompuesto )
          {
            respuesta = "Todos los valores correspondientes a la lista de atributos compuestos deben estar gestionados.";
            return false;
          }
        });
      }
    }
    
    return respuesta;
  }



  


  public irEquivalencia() {
    //alert("irEquivalencia");
    let entidadEquivalencia:AtributoEquivalencia=new AtributoEquivalencia();
    entidadEquivalencia.id=this.entidadEquivalencia.id;
    entidadEquivalencia.nombre =this.entidadEquivalencia.nombre;
    this.alerta.agregarEquivalenciaXlsVentana(
      entidadEquivalencia,
      () => this.recargarListado()
    );
  }


  public async recargarListado() {
    console.log("Respuesta:::",this.restDetalleEq.getRespuesta());
    if(this.restDetalleEq.getRespuesta()){
       alert("recargar..."); 
      //this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(() =>
      //this.router.navigate(['aplicacion/equivalencia/lis-equivalencia']));
    }else{
      this.alerta.mostrarError(this.restDetalleEq.getInfoData());
    } 
  }



  descargar() {

    //alert("descargar");
    let atributo = new AtributoEquivalencia();
    atributo.id=this.entidadEquivalencia.id;
    this.restDetalleEq.descargarPlatillaEquivalencia(atributo).subscribe(
      data => {
        alert(data.data);
        this.urlFichero= this.restDetalleEq.obtenerFichero(data.data);
        this.downloadFile();
      },
      error => {
        alert("error");
        console.log(error);
      }
    )
  }



   
  


  downloadFile() {
    setTimeout(()=>{
         this.descargarh5.nativeElement.click();
    }, 500);
  }



}