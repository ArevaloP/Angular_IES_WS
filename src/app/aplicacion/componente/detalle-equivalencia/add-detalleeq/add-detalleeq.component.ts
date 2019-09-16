import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DetalleEquivalencia } from '../../../modelo/detalle-equivalencia';
import { EstructuraEntidad } from '../../../modelo/estructura-entidad';

@Component({
  selector: 'app-add-detalleeq',
  templateUrl: './add-detalleeq.component.html',
  styleUrls: ['./add-detalleeq.component.scss']
})
export class AddDetalleeqComponent implements OnInit
{
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

  @Input() estructuraEntidad: EstructuraEntidad;
  
  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit()
  {
    this.porDefecto = true;
    this.listaProcesar = null;
    this.inicializarValidacion();
  }

  public inicializarValidacion()
  {
    this.fGeneral = this.fb.group({
      nOrigen: [this.detalleEquivalencia.nombreOrigen],
      vOrigen: [this.detalleEquivalencia.valorOrigen],
      nombreOrigen: [this.detalleEquivalencia.valorOrigen],
      valorOrigen: [this.detalleEquivalencia.valorOrigen],
      nombreEquivalencia: [this.detalleEquivalencia.nombreEquivalencia],
      valorEquivalente: [this.detalleEquivalencia.valorEquivalente]
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
    console.log( this.cntNombre, this.cntValor );
    if ( this.cntNombre && this.cntValor )
    {
      alert("Cargar lista procesar.");
      
      if ( this.listaProcesar )
      {
        // this.listaProcesar
      }
      else {
        this.listaProcesar = [];
        
        this.estructuraEntidad.datos.forEach( (objeto) => {
          this.detalleEquivalenciaCargar = new DetalleEquivalencia();
          this.detalleEquivalenciaCargar.nombreOrigen = objeto[this.cntNombre.toString()];
          this.detalleEquivalenciaCargar.valorOrigen = objeto[this.cntValor.toString()];
          this.detalleEquivalenciaCargar.esAutomatico = true;
          this.listaProcesar.push(this.detalleEquivalenciaCargar);
        });
      }
    }
  }

  public adManual()
  {
    console.log( this.detalleEquivalencia );
  }
}