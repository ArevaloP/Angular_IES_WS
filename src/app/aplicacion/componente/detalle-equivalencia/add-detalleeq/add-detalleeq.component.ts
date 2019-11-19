import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DetalleEquivalencia } from '../../../modelo/detalle-equivalencia';
import { EstructuraEntidad } from '../../../modelo/estructura-entidad';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';
import { RestEquivalenciaService } from '../../../servicio/rest-equivalencia.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-add-detalleeq',
  templateUrl: './add-detalleeq.component.html',
  styleUrls: ['./add-detalleeq.component.scss']
})
export class AddDetalleeqComponent implements OnInit
{
  @Input() estructuraEntidad: EstructuraEntidad;
  @Input() entidadEquivalencia: AtributoEquivalencia;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public fGeneral: FormGroup;
  public detalleEquivalencia: DetalleEquivalencia = new DetalleEquivalencia();
  public nombreColumna: String;
  public valorColumna: String;
  public porDefecto: Boolean;
  public porDefecto2: Boolean;
  public listaProcesar: DetalleEquivalencia[];
  public detalleEquivalenciaCargar: DetalleEquivalencia;
  public cntNombre: String;
  public cntValor: String;
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  
  constructor(
    public fb: FormBuilder,
    public restEquivalencia: RestEquivalenciaService
  ) { }

  ngOnInit()
  {
    this.porDefecto = true;
    // this.inicializarValidacion();
    this.listaProcesar = this.entidadEquivalencia.listaDetalles;
    this.cntNombre = this.entidadEquivalencia.tagNombreOrigen;
    this.cntValor = this.entidadEquivalencia.tagValorOrigen;
  }

  public inicializarValidacion()
  {
    this.fGeneral = this.fb.group({
      nOrigen: [this.detalleEquivalencia.nombreOrigen],
      vOrigen: [this.detalleEquivalencia.valorOrigen],
      nombreOrigen: [this.detalleEquivalencia.valorOrigen],
      valorOrigen: [this.detalleEquivalencia.valorOrigen],
      nombreEquivalencia: [this.detalleEquivalencia.nombreEquivalencia],
      valorEquivalente: [this.detalleEquivalencia.valorEquivalente],
      nombreEquivalenciaX: [],
      valorEquivalenteX: []
    });

  }

  public cargarNombres( value )
  {
    if ( this.porDefecto )
      this.porDefecto = false;
    else
      this.nombreColumna = value;

    this.cntNombre = value;
    this.cargarListaProcesar();
  }
  
  public cargarValores( value )
  {
    if ( this.porDefecto2 )
      this.porDefecto2 = false;
    else
      this.valorColumna = value;
    
    this.cntValor = value;
    this.cargarListaProcesar();
  }

  public cargarListaProcesar()
  {
    if ( this.cntNombre && this.cntValor )
    {
      if ( this.listaProcesar )
      {
        let objEncontrado;
        
        this.listaProcesar.forEach( (objeto) => {
          if ( "1" == objeto.esAutomatico )
          {
            objEncontrado = this.estructuraEntidad.datos.find( (objetoBus) => {
              return objeto.indice == objetoBus.identificador;
            });
            
            objeto.nombreOrigen = this.getDatoDetalle( objEncontrado[this.cntNombre.toString()] );
            objeto.valorOrigen = this.getDatoDetalle( objEncontrado[this.cntValor.toString()] );
          }
        });

        if ( !objEncontrado )
          this.adAutomatica();
      }
      else {
        this.adAutomatica();
      }
    }
  }

  public adAutomatica()
  {
    if ( !this.listaProcesar )
      this.listaProcesar = [];
    
    this.estructuraEntidad.datos.forEach( (objeto) => {
      this.detalleEquivalenciaCargar = new DetalleEquivalencia();
      this.detalleEquivalenciaCargar.nombreOrigen = this.getDatoDetalle( objeto[this.cntNombre.toString()] );
      this.detalleEquivalenciaCargar.valorOrigen = this.getDatoDetalle( objeto[this.cntValor.toString()] );
      this.detalleEquivalenciaCargar.esAutomatico = "1";
      this.detalleEquivalenciaCargar.indice = objeto.identificador;
      this.detalleEquivalenciaCargar.esCompuesto = "0";
      this.detalleEquivalenciaCargar.accion = "A";
      this.listaProcesar.push(this.detalleEquivalenciaCargar);
    });
    
    this.entidadEquivalencia.listaDetalles = this.listaProcesar;
  }

  public adManual()
  {
    if ( this.detalleEquivalencia.nombreOrigen && "" != this.detalleEquivalencia.nombreOrigen.trim()
        && this.detalleEquivalencia.valorOrigen && "" != this.detalleEquivalencia.valorOrigen.trim() )
    {
      if ( !this.listaProcesar )
        this.listaProcesar = [];
      
      this.detalleEquivalenciaCargar = new DetalleEquivalencia();
      this.detalleEquivalenciaCargar.nombreOrigen = this.detalleEquivalencia.nombreOrigen;
      this.detalleEquivalenciaCargar.valorOrigen = this.detalleEquivalencia.valorOrigen;
      this.detalleEquivalenciaCargar.nombreEquivalencia = this.detalleEquivalencia.nombreEquivalencia;
      this.detalleEquivalenciaCargar.valorEquivalente = this.detalleEquivalencia.valorEquivalente;
      this.detalleEquivalenciaCargar.esAutomatico = "0";
      this.detalleEquivalenciaCargar.esCompuesto = "0";
      this.listaProcesar.push(this.detalleEquivalenciaCargar);
      this.detalleEquivalencia.nombreOrigen = null;
      this.detalleEquivalencia.valorOrigen = null;
      this.detalleEquivalencia.nombreEquivalencia = null;
      this.detalleEquivalencia.valorEquivalente = null;
      this.detalleEquivalenciaCargar.accion = "A";
      this.entidadEquivalencia.listaDetalles = this.listaProcesar;
    }
  }

  public suprimirEquivalencia( indice )
  {
    this.listaProcesar[indice].registradoPor = this.usuarioVO.oid;
    this.restEquivalencia.eliminarDetalleEquivalencia( this.listaProcesar[indice] ).subscribe(
      data => {
        this.listaProcesar.splice( indice, 1 );
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public getDatoDetalle( str )
  {
    let dato;

    dato = (str && "" != str.trim()) ? str : "-1";
    
    return dato;
  }
}