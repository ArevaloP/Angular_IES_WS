import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { Router } from '@angular/router';
import { UserWebService } from '../../../modelo/user-web-service';

@Component({
  selector: 'app-add-usuariows',
  templateUrl: './add-usuariows.component.html',
  styleUrls: ['./add-usuariows.component.scss']
})
export class AddUsuariowsComponent implements OnInit {


  private fGeneral: FormGroup;
  private isModificar: boolean = false;
  private userWebService: UserWebService = new UserWebService();


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
      //this.servicioWeb.tipo = "WEB";
      this.isModificar = false;
    }
    this.inicializarValidacion();

  }


  public inicializarValidacion() {

    this.userWebService.registradoPor = "usua_";
    this.userWebService.usuarioRealiza = "nombre";

    this.fGeneral = this.fb.group({
      //codigo: [this.aplicacionExterna.codigo, [Validators.required]]
      usuario: [this.userWebService.usuario, Validators.required],
      password: [this.userWebService.password, Validators.required],
      estado: [this.userWebService.estado, Validators.required]

    });

  }


  public registarUsuarioServicio() {

    console.log(this.userWebService);
    if (!this.isModificar) {
      this.restUsuario.insertarUserWebService(this.userWebService).subscribe(
        data => {
          alert("insercion exitosa ");
          this.router.navigate(['aplicacion/usuarioWs']);
        },
        error => {
          alert(JSON.stringify(error));
        }
      );
    } else {
      this.restUsuario.actualizarUserWebService(this.userWebService).subscribe(
        data => {
          alert("actualizacion exitosa ");
          this.router.navigate(['aplicacion/usuarioWs']);
        },
        error => {
          alert(JSON.stringify(error));
        }
      );

    }


  }





}
