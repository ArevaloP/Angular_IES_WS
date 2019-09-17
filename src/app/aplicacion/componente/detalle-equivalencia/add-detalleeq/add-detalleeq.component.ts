import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DetalleEquivalencia } from '../../../modelo/detalle-equivalencia';
import { EstructuraEntidad } from '../../../modelo/estructura-entidad';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';

@Component({
  selector: 'app-add-detalleeq',
  templateUrl: './add-detalleeq.component.html',
  styleUrls: ['./add-detalleeq.component.scss']
})
export class AddDetalleeqComponent implements OnInit
{
  @Input() estructuraEntidad: EstructuraEntidad;
  @Input() entidadEquivalencia: AtributoEquivalencia;

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
  
  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit()
  {
    this.porDefecto = true;
    // this.inicializarValidacion();
    this.listaProcesar = this.entidadEquivalencia.listaDetalles;
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
    console.log("estructuraEntidad",this.estructuraEntidad);
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
          if ( objeto.esAutomatico )
          {
            objEncontrado = this.estructuraEntidad.datos.find( (objetoBus) => {
              return objeto.iAutomatico == objetoBus.indice;
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
    
    this.estructuraEntidad.datos.forEach( (objeto, indice) => {
      this.detalleEquivalenciaCargar = new DetalleEquivalencia();
      this.detalleEquivalenciaCargar.nombreOrigen = this.getDatoDetalle( objeto[this.cntNombre.toString()] );
      this.detalleEquivalenciaCargar.valorOrigen = this.getDatoDetalle( objeto[this.cntValor.toString()] );
      this.detalleEquivalenciaCargar.esAutomatico = true;
      this.detalleEquivalenciaCargar.iAutomatico = indice;
      this.detalleEquivalenciaCargar.esCompuesto = "0";
      objeto.indice = indice;
      this.listaProcesar.push(this.detalleEquivalenciaCargar);
    });
    
    this.entidadEquivalencia.listaDetalles = this.listaProcesar;
  }

  public adManual()
  {
    if ( !this.listaProcesar )
      this.listaProcesar = [];
    
    this.detalleEquivalenciaCargar = new DetalleEquivalencia();
    this.detalleEquivalenciaCargar.nombreOrigen = this.detalleEquivalencia.nombreOrigen;
    this.detalleEquivalenciaCargar.valorOrigen = this.detalleEquivalencia.valorOrigen;
    this.detalleEquivalenciaCargar.nombreEquivalencia = this.detalleEquivalencia.nombreEquivalencia;
    this.detalleEquivalenciaCargar.valorEquivalente = this.detalleEquivalencia.valorEquivalente;
    this.detalleEquivalenciaCargar.esCompuesto = "0";
    this.listaProcesar.push(this.detalleEquivalenciaCargar);
    this.detalleEquivalencia.nombreOrigen = null;
    this.detalleEquivalencia.valorOrigen = null;
    this.detalleEquivalencia.nombreEquivalencia = null;
    this.detalleEquivalencia.valorEquivalente = null;
    console.log( this.listaProcesar );
    this.entidadEquivalencia.listaDetalles = this.listaProcesar;
  }

  public suprimirEquivalencia( indice )
  {
    this.listaProcesar.splice( indice, 1 );
  }

  public getDatoDetalle( str )
  {
    let dato;

    dato = (str && "" != str.trim()) ? str : "-1";
    
    return dato;
  }
}