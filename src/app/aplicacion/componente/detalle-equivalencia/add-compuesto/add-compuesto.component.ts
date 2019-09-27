import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DetalleEquivalencia } from '../../../modelo/detalle-equivalencia';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { AtributoCompuesto } from '../../../modelo/atributo-compuesto';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';

@Component({
  selector: 'app-add-compuesto',
  templateUrl: './add-compuesto.component.html',
  styleUrls: ['./add-compuesto.component.scss']
})
export class AddCompuestoComponent implements OnInit
{
  @Input() entidadEquivalencia: AtributoEquivalencia;
  
  public detalleEquivalencia: DetalleEquivalencia;
  public detalleEquivalenciaCargar: DetalleEquivalencia;
  public listaProcesar: DetalleEquivalencia[];
  public atributoCompuesto: AtributoCompuesto;
  public listaCompuestos: AtributoCompuesto[];
  public inicialSelected: Boolean;

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  
  constructor() { }

  ngOnInit()
  {
    this.detalleEquivalencia = new DetalleEquivalencia();
    this.listaProcesar = this.entidadEquivalencia.listaDetallesCompuestos;
  }

  public addDestino()
  {
    if ( !this.listaProcesar )
      this.listaProcesar = [];
    
    this.detalleEquivalenciaCargar = new DetalleEquivalencia();
    this.detalleEquivalenciaCargar.nombreOrigen = null;
    this.detalleEquivalenciaCargar.valorOrigen = null;
    this.detalleEquivalenciaCargar.nombreEquivalencia = this.detalleEquivalencia.nombreEquivalencia;
    this.detalleEquivalenciaCargar.valorEquivalente = this.detalleEquivalencia.valorEquivalente;
    this.detalleEquivalenciaCargar.esAutomatico = "0";
    this.detalleEquivalenciaCargar.esCompuesto = "1";
    this.listaProcesar.push(this.detalleEquivalenciaCargar);
    this.detalleEquivalencia.nombreEquivalencia = null;
    this.detalleEquivalencia.valorEquivalente = null;

    // Si ya se ha agregado el destino inicial y este contiene uno o más origenes,
    // se copia los origenes del inicial al nuevo destino.
    if ( this.listaProcesar.length > 1 && this.listaProcesar[0].listadoCompuesto && this.listaProcesar[0].listadoCompuesto.length > 0 )
    {
      this.detalleEquivalenciaCargar.listadoCompuesto = this.copiarArray( this.listaProcesar[0].listadoCompuesto );
    }
    
    this.detalleEquivalenciaCargar = null;
  }

  public copiarArray( listaIn )
  {
    let listaOut = null;
    
    if ( listaIn && listaIn.length > 0 )
    {
      listaOut = listaIn.slice();

      for ( let j = 0; j < listaOut.length; j++ )
      {
        // La función slice() copia las referencias de los objetos,
        // por lo que hay que crear un nuevo objeto a partir del original.
        let atributoCompuesto = JSON.parse( JSON.stringify( listaOut[j] ) );
        atributoCompuesto.valorOrigen = null;
        listaOut[j] = atributoCompuesto;
      }
    }

    return listaOut;
  }

  public suprimirDestino( indice )
  {
    this.listaProcesar.splice( indice, 1 );
  }

  public selDestino( indice )
  {
    this.entidadEquivalencia.listaDetallesCompuestos = this.listaProcesar;
    this.detalleEquivalenciaCargar = this.listaProcesar[ indice ];
    this.listaCompuestos = this.detalleEquivalenciaCargar.listadoCompuesto;
    this.inicialSelected = 0 === indice;
  }

  public addOrigen()
  {
    if ( !this.listaCompuestos )
      this.listaCompuestos = [];
    
    this.atributoCompuesto = new AtributoCompuesto();
    this.atributoCompuesto.nombreOrigen = this.detalleEquivalencia.nombreOrigen.trim();
    this.atributoCompuesto.valorOrigen = this.detalleEquivalencia.valorOrigen.trim();
    this.atributoCompuesto.usuarioRealiza = this.atributoCompuesto.nombreOrigen;
    this.listaCompuestos.push( this.atributoCompuesto );
    this.detalleEquivalenciaCargar.listadoCompuesto = this.listaCompuestos;
    this.detalleEquivalencia.nombreOrigen = null;
    this.detalleEquivalencia.valorOrigen = null;
    this.procesarOrigenComplementarios();
  }

  // Función que agrega o modifica las equivalencias origenes de los destinos siguientes al inicial.
  public procesarOrigenComplementarios()
  {
    let atributoCompuestoAux;
    let detalleEquivalenciaInicial: DetalleEquivalencia; // por si se necesita en algún momento.
    
    if ( this.listaProcesar.length > 1 )
    {
      this.listaProcesar.forEach( (detalleEquivalencia, index) => {
        if ( 0 == index )
          detalleEquivalenciaInicial = detalleEquivalencia;
        else { // se procede a gestionar los registros siguientes al inicial.
          if ( detalleEquivalencia.listadoCompuesto && detalleEquivalencia.listadoCompuesto.length > 0 )
          {
            this.listaCompuestos.forEach( atributoCompuestoBase => {
              atributoCompuestoAux = detalleEquivalencia.listadoCompuesto.find( atributoCompuesto => {
                return atributoCompuestoBase.usuarioRealiza === atributoCompuesto.usuarioRealiza;
              });

              if ( atributoCompuestoAux ) // si ya existía, solo modifica el nombre.
                atributoCompuestoAux.nombreOrigen = atributoCompuestoBase.nombreOrigen;
              else { // si no, solo se agrega el registro a la lista.
                atributoCompuestoAux = JSON.parse( JSON.stringify( atributoCompuestoBase ) );
                atributoCompuestoAux.valorOrigen = null;
                detalleEquivalencia.listadoCompuesto.push( atributoCompuestoAux );
              }
            });
          }
          else // si no tenía ningún registro, copia la lista completa.
            detalleEquivalencia.listadoCompuesto = this.copiarArray( this.listaCompuestos );
        }
      });
    }
  }

  public suprimirOrigen( indice )
  {
    this.listaProcesar.forEach( detalleEquivalencia => {
      if ( detalleEquivalencia.listadoCompuesto )
        detalleEquivalencia.listadoCompuesto.splice( indice, 1 );
    });
  }
}