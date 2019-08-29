import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GrupoLlamado } from '../../../modelo/grupo-llamado';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { RestGrupoLlamadoService } from '../../../servicio/grupo-llamado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-grupollamado',
  templateUrl: './add-grupollamado.component.html',
  styleUrls: ['./add-grupollamado.component.scss']
})
export class AddGrupollamadoComponent implements OnInit {


  public fGeneral: FormGroup;
  public grupoLlamado: GrupoLlamado = new GrupoLlamado();
  public isModificar: boolean = false;
  public isNuevaConexion: boolean = false;
  public listaConexionesExistente: GrupoLlamado[];
  public indexConexion: number;
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  constructor(
    public fb: FormBuilder,
    public restGrupoLlamado: RestGrupoLlamadoService,
    public router: Router
  ) {

  }



  ngOnInit() {

    if (this.restGrupoLlamado.getGrupoLlamado() != null) {
      this.grupoLlamado = this.restGrupoLlamado.getGrupoLlamado();
      this.isModificar = true;
    } else {
      this.isModificar = false;
    }

    this.inicializarValidacion();
  }





  public inicializarValidacion() {

    this.fGeneral = this.fb.group({
      codigo: [this.grupoLlamado.codigo, Validators.required],
      nombre: [this.grupoLlamado.nombre, Validators.required],
      aplicacion: [this.grupoLlamado.idAplicacion, Validators.required],
      estado: [this.grupoLlamado.estado, Validators.required],
      descripcion: [this.grupoLlamado.descripcion, Validators.required]

    }
    );

  }






  public irRegistar() {
    this.grupoLlamado.estado = "ACTIVO";
    this.grupoLlamado.registradoPor = this.usuarioVO.oid;
    this.grupoLlamado.usuarioRealiza = this.usuarioVO.name;
    this.grupoLlamado.descripcion = this.grupoLlamado.nombre;

    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿ Esta seguro de modificar el grupo llamado [" + this.grupoLlamado.nombre + "]  ?"),
        () => this.actualizarGrupoLlamado(this.grupoLlamado)
      );
    } else {

      this.alerta.confirmarInsertar(
        ("¿ Esta seguro de agregar el grupo llamado [" + this.grupoLlamado.nombre + "]  ?"),
        () => this.insertarGrupoLlamado(this.grupoLlamado)
      );
    }


  }




  public insertarGrupoLlamado(grupoLlamado) {
    this.restGrupoLlamado.insertarGrupoLlamado(grupoLlamado).subscribe(
      data => {
        this.router.navigate(['aplicacion/lis-grupollamado']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }


  public actualizarGrupoLlamado(grupoLlamado) {

    this.restGrupoLlamado.actualizarGrupoLlamado(grupoLlamado).subscribe(
      data => {
        this.router.navigate(['aplicacion/lis-grupollamado']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );


  }






}
