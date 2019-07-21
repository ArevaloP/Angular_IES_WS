import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { Router } from '@angular/router';
import { UserWebService } from '../../../modelo/user-web-service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-add-usuariows',
  templateUrl: './add-usuariows.component.html',
  styleUrls: ['./add-usuariows.component.scss']
})
export class AddUsuariowsComponent implements OnInit {


  private fGeneral: FormGroup;
  private isModificar: boolean = false;
  private userWebService: UserWebService = new UserWebService();
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    private fb: FormBuilder,
    private restUsuario: RestUserWebService,
    private router: Router

  ) { }

  ngOnInit() {


    if (this.restUsuario.getUserWebService() != null) {
      this.userWebService = this.restUsuario.getUserWebService();
      this.isModificar = true;
    } else {
      this.userWebService.estado = "ACTIVO";
      this.isModificar = false;
    }
    this.inicializarValidacion();

  }


  public inicializarValidacion() {

    this.userWebService.registradoPor = "usua_";
    this.userWebService.usuarioRealiza = "nombre";

    this.fGeneral = this.fb.group({
      usuario: [this.userWebService.usuario, Validators.required],
      password: [this.userWebService.password, Validators.required],
      estado: [this.userWebService.estado, Validators.required]
    });

  }




  public irRegistar() {

    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿ Esta seguro de eliminar el servicio [" + this.userWebService.nombre + "]  ?"),
        () => this.actualizarUsuarioWs(this.userWebService)
      );
    } else {
      this.alerta.confirmarInsertar(
        ("¿ Esta seguro de eliminar el servicio [" + this.userWebService.nombre + "]  ?"),
        () => this.insertarUsuarioWs(this.userWebService)
      );

    }

  }



  public insertarUsuarioWs(userWebService) {
    this.restUsuario.insertarUserWebService(userWebService).subscribe(
      data => {
        alert("insercion exitosa ");
        this.router.navigate(['aplicacion/usuarioWs']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }



  public actualizarUsuarioWs(userWebService) {
    this.restUsuario.actualizarUserWebService(userWebService).subscribe(
      data => {
        alert("actualizacion exitosa ");
        this.router.navigate(['aplicacion/usuarioWs']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }









}
