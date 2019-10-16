import { Component, OnInit, ViewChild } from '@angular/core';
import { ImplementacionClase } from '../../../modelo/implementacion-clase';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestImplementacionClaseService } from '../../../servicio/rest-implementacion-clase.service';
import { UploadLibreriaComponent } from '../../utilidad/upload-libreria/upload-libreria.component';
import { RestGrupoLlamadoService } from '../../../servicio/grupo-llamado.service';
import { GrupoLlamado } from '../../../modelo/grupo-llamado';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-clase',
  templateUrl: './add-clase.component.html',
  styleUrls: ['./add-clase.component.scss']
})
export class AddClaseComponent implements OnInit {

  public fGeneral: FormGroup;
  public implementacion: ImplementacionClase = new ImplementacionClase();
  public isModificar: boolean = false;
  public isNuevaConexion: boolean = false;
  public listaConexionesExistente: ImplementacionClase[];
  public indexConexion: number;
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listaGrupoLlamado: GrupoLlamado[];
  public numeroColumna = 6;


  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild('libreriaZip', { static: false }) public libreriaZip: UploadLibreriaComponent;

  constructor(
    public fb: FormBuilder,
    public restImplementacionClase: RestImplementacionClaseService,
    public restGrupoLlamado: RestGrupoLlamadoService,
    public router: Router
  ) {

  }



  ngOnInit() {

    if (this.restImplementacionClase.getImplementacionClase() != null) {
      this.implementacion = this.restImplementacionClase.getImplementacionClase();
      this.isModificar = true;
    } else {
      this.isModificar = false;
    }
    this.cambiarTipo();
    this.listarGrupoLlamado();
    this.inicializarValidacion();
  }





  public inicializarValidacion() {

    this.fGeneral = this.fb.group({
      codigo: [this.implementacion.codigo, Validators.required],
      nombre: [this.implementacion.nombre, Validators.required],
      tipoServicio: [this.implementacion.tipoServicio, Validators.required],
      estado: [this.implementacion.estado, Validators.required],
      clase: [this.implementacion.clase, Validators.required],
      idGrupoLlamado: []

    }
    );

  }






  public irRegistar() {
    this.implementacion.estado = "ACTIVO";
    this.implementacion.registradoPor = this.usuarioVO.oid;
    this.implementacion.usuarioRealiza = this.usuarioVO.name;
    this.implementacion.cambioImagen = this.libreriaZip.cambioFichero;
    if (this.libreriaZip.cambioFichero) {
      this.implementacion.nombreFile = this.libreriaZip.uploadResponse.filePath;
    }

    if (this.implementacion.tipoServicio != 'GRUPO'){
      this.implementacion.idGrupoLlamado=null;
    }

    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿Esta seguro de modificar la clase [" + this.implementacion.nombre + "]?"),
        () => this.actualizarImplementacionClase(this.implementacion)
      );
    } else {

      this.alerta.confirmarInsertar(
        ("¿Esta seguro de agregar la clase [" + this.implementacion.nombre + "]?"),
        () => this.insertarImplementacionClase(this.implementacion)
      );
    }


  }




  public insertarImplementacionClase(restImplementacion) {
    this.restImplementacionClase.insertarImplementacionClase(restImplementacion).subscribe(
      data => {
        this.router.navigate(['aplicacion/interfaz/lis-clase']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }


  public actualizarImplementacionClase(restImplementacion) {

    this.restImplementacionClase.actualizarImplementacionClase(restImplementacion).subscribe(
      data => {
        this.router.navigate(['aplicacion/interfaz/lis-clase']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );


  }


  public cambiarTipo() {

    if (this.implementacion.tipoServicio == 'GRUPO') {
      this.numeroColumna = 4;
      this.implementacion.clase="up.ws.server.integrador.servicio.resultado.clase.CargarServicioGrupo";
    } else {
      this.numeroColumna = 6;
      if(this.implementacion.clase=="up.ws.server.integrador.servicio.resultado.clase.CargarServicioGrupo"){
        this.implementacion.clase="";
      }
    }

  }


  public listarGrupoLlamado() {

    this.restGrupoLlamado.listarGrupoLlamado().subscribe(
      data => {
        this.listaGrupoLlamado = data;
        console.log(data);
      },
      error => {
        this.alerta.mostrarError(error);
      }

    )

  }





}
