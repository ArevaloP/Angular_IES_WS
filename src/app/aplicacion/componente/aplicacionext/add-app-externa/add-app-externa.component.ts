import { Component, OnInit, ViewChild } from '@angular/core';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';
import { Router } from '@angular/router';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { LisAplicacionServicioComponent } from '../lis-aplicacion-servicio/lis-aplicacion-servicio.component';
import { LisAplicacionUsuarioComponent } from '../lis-aplicacion-usuario/lis-aplicacion-usuario.component';

@Component({
  selector: 'app-add-app-externa',
  templateUrl: './add-app-externa.component.html',
  styleUrls: ['./add-app-externa.component.scss']
})
export class AddAppExternaComponent implements OnInit {


  public aplicacionExterna: AplicacionExterna = new AplicacionExterna();
  public fGeneral: FormGroup;
  public isModificar: boolean = false;
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild('lstServicio', { static: false }) public lstServicio: LisAplicacionServicioComponent;
  @ViewChild('lstUsuario', { static: false }) public lstUsuario: LisAplicacionUsuarioComponent;

 
  
  constructor(
    public fb: FormBuilder,
    public restAplicacion: RestAplicacionService,
    public restServicio: RestServicioWebService,
    public restUsuario: RestUserWebService,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.inicializarValidacion();


    if (this.restAplicacion.getAplicacionExterna() != null) {
      this.aplicacionExterna = this.restAplicacion.getAplicacionExterna();
      this.isModificar = true;
    } else {
      this.aplicacionExterna.estado = "ACTIVO";
      this.aplicacionExterna.tipo = "WEB";
      this.isModificar = false;
    }

    this.cargarListaServiciosWeb();
    this.cargarListaUsuarioAplicacion();

  }


  public inicializarValidacion() {

    this.fGeneral = this.fb.group({
      //codigo: [this.aplicacionExterna.codigo, [Validators.required]]
      codigo: [this.aplicacionExterna.codigo, Validators.required],
      nombre: [this.aplicacionExterna.nombre, Validators.required],
      urlAplicacion: [this.aplicacionExterna.urlAplicacion, Validators.required],
      estado: [this.aplicacionExterna.estado, Validators.required],
      tipo: [this.aplicacionExterna.tipo, Validators.required],
      descripcion: [this.aplicacionExterna.descripcion, Validators.required]
    }
    );

  }


  public irRegistar() {

    this.aplicacionExterna.registradoPor = this.usuarioVO.oid;
    this.aplicacionExterna.usuarioRealiza = this.usuarioVO.name;
    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿ Esta seguro de modificar el usuario [" + this.aplicacionExterna.nombre + "]  ?"),
        () => this.actualizarAplicacion(this.aplicacionExterna)
      );
    } else {

      this.alerta.confirmarInsertar(
        ("¿ Esta seguro de agregar el usuario [" + this.aplicacionExterna.nombre + "]  ?"),
        () => this.insertarAplicacion(this.aplicacionExterna)
      );
    }
  }




  public insertarAplicacion(appExterna) {
    this.restAplicacion.insertarAplicacionExterna(appExterna).subscribe(
      data => {
        this.router.navigate(['aplicacion/lis-appexterna']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }



  public actualizarAplicacion(appExterna) {

    this.restAplicacion.actualizarAplicacionExterna(appExterna).subscribe(
      data => {
        this.router.navigate(['aplicacion/lis-appexterna']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );


  }





  public cargarListaServiciosWeb() {
    this.restServicio.listarServicioWebAplicacion(this.aplicacionExterna.id).subscribe(
      data => {
        this.aplicacionExterna.listaServicioWeb = data;
        this.restServicio.setListaServicio(data);
        //console.log(data);
        this.lstServicio.load(data);
      },
      error => { 
        this.alerta.mostrarError(error);
      }
    );
  }


  public cargarListaUsuarioAplicacion() {
    this.restUsuario.listarUsuarioServicioWebAplicacion(this.aplicacionExterna.id).subscribe(
      data => {
        this.aplicacionExterna.listaUsuarioAplicacion = data;
        this.lstUsuario.load(data);
      },
      error => { 
		this.alerta.mostrarError(error);
	  }
    );
  }









}
