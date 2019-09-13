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

  @Input() estructuraEntidad: EstructuraEntidad;
  
  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit()
  {
    this.porDefecto = true;
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
    if ( this.porDefecto )
      this.porDefecto = false;
    else
      this.nombreColumna = value;
  }
  
  public cargarValores( value )
  {
    if ( this.porDefecto2 )
      this.porDefecto2 = false;
    else
      this.valorColumna = value;
  }

  public adManual()
  {
    console.log( this.detalleEquivalencia );
  }
}