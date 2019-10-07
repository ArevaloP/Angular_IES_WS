import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestParametroArrayService } from '../../../servicio/rest-parametro-array.service';
import { ListaParametro } from '../../../modelo/lista-parametro';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-add-parametro-array',
  templateUrl: './add-parametro-array.component.html',
  styleUrls: ['./add-parametro-array.component.scss']
})
export class AddParametroArrayComponent implements OnInit
{
  public fGeneral: FormGroup;
  public isModificar: boolean = false;
  public listaParametro: ListaParametro = new ListaParametro();
  public listaParametros: ListaParametro[];
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    public fb: FormBuilder,
    public restParametroArray: RestParametroArrayService,
    public router: Router
  ) { }

  ngOnInit()
  {
    if ( this.restParametroArray.getListaParametro() != null )
    {
      this.listaParametro = this.restParametroArray.getListaParametro();
      this.isModificar = true;
    }
    else {
      this.listaParametro.estado = "ACTIVO";
      this.isModificar = false;
    }

    this.inicializarValidacion();
  }

  public inicializarValidacion()
  {
    this.listaParametro.registradoPor = this.usuarioVO.oid;;
    this.listaParametro.usuarioRealiza = this.usuarioVO.name;
    this.fGeneral = this.fb.group({
      codigo: [this.listaParametro.codigo, Validators.required],
      nombre: [this.listaParametro.nombre, Validators.required],
      estado: [this.listaParametro.estado, Validators.required]
    });
  }

  public irRegistar()
  {
    this.listaParametro.registradoPor = this.usuarioVO.oid;
    this.listaParametro.usuarioRealiza = this.usuarioVO.name;

    if ( this.isModificar )
    {
      this.alerta.confirmarActualizar(
        ("¿Esta seguro de modificar la lista de parámetros [" + this.listaParametro.nombre + "]?"),
        () => this.actualizarListaParametro(this.listaParametro)
      );
    }
    else {
      this.alerta.confirmarInsertar(
        ("¿Esta seguro de agregar la lista de parámetros [" + this.listaParametro.nombre + "]?"),
        () => this.insertarListaParametro(this.listaParametro)
      );

    }

  }

  public insertarListaParametro( listaParametro )
  {
    this.restParametroArray.insertarListaParametros( listaParametro ).subscribe(
      data => {
        this.router.navigate(['aplicacion/parametros-array/lis-parametro-array']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

  public actualizarListaParametro( listaParametro )
  {
    this.restParametroArray.actualizarListaParametros( listaParametro ).subscribe(
      data => {
        this.router.navigate(['aplicacion/parametros-array/lis-parametro-array']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

}