import { Component, OnInit, ViewChild } from '@angular/core';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { RestEquivalenciaService } from '../../../servicio/rest-equivalencia.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';

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
  public listaConexiones: JdbcConexion[];
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    public fb: FormBuilder,
    public restEquivalencia: RestEquivalenciaService,
    public restConexion: RestJdbcConexionService,
    public router: Router
  ) { }

  ngOnInit()
  {
    this.listaConexiones = this.restConexion.getListaConexiones();
    
    if (this.restEquivalencia.getEntidadEquivalencia() != null)
    {
      this.entidadEquivalencia = this.restEquivalencia.getEntidadEquivalencia();
      this.isModificar = true;
    } else {
      this.isModificar = false;
    }
    
    this.inicializarValidacion();
  }

  public inicializarValidacion()
  {
    this.fGeneral = this.fb.group({
      nombre: [this.entidadEquivalencia.nombre, Validators.required],
      entidad: [this.entidadEquivalencia.entidad],
      descripcion: [this.entidadEquivalencia.descripcion],
      conexion: [this.entidadEquivalencia.idConexionJdbc]
    });

  }

  public irRegistar()
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
      this.alerta.confirmarInsertar(
        ("¿Esta seguro de agregar la equivalencia [" + this.entidadEquivalencia.nombre + "]?"),
        () => this.insertarEntidadEquivalencia(this.entidadEquivalencia)
      );
    }
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
}