import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { Router } from '@angular/router';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-servicio-web',
  templateUrl: './add-servicio-web.component.html',
  styleUrls: ['./add-servicio-web.component.scss']
})
export class AddServicioWebComponent implements OnInit {


  private fGeneral: FormGroup;
  private servicioWeb: ServicioWeb = new ServicioWeb();
  private isModificar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private restServicio: RestServicioWebService,
    private router: Router

  ) { }

  ngOnInit() {


    if (this.restServicio.getServicioWeb() != null) {
      this.servicioWeb = this.restServicio.getServicioWeb();
      this.isModificar = true;
    } else {
      this.servicioWeb.estado = "ACTIVO";
      //this.servicioWeb.tipo = "WEB";
      this.isModificar = false;
    }
    console.log("SERVICIO:("+this.isModificar+")", this.servicioWeb);
    this.inicializarValidacion();

  }



  public inicializarValidacion() {

    this.servicioWeb.registradoPor = "usua_";
    this.servicioWeb.usuarioRealiza = "nombre";

    this.fGeneral = this.fb.group({
      //codigo: [this.aplicacionExterna.codigo, [Validators.required]]
      codigo: [this.servicioWeb.codigo, Validators.required],
      protocolo: [this.servicioWeb.protocolo, Validators.required],
      nombre: [this.servicioWeb.nombre, Validators.required],
      tipo: [this.servicioWeb.tipo, Validators.required],
      descripcion: [this.servicioWeb.descripcion, Validators.required],
      url: [this.servicioWeb.url, Validators.required],
      estado: [this.servicioWeb.estado, Validators.required],
      metodo: [this.servicioWeb.metodo, Validators.required],
      query: [this.servicioWeb.query],
      identificadorPadre: [this.servicioWeb.identificadorPadre],
      parametros: [this.servicioWeb.parametros]

    }
    );
  }


  public registarServicioWeb() {

    console.log(this.servicioWeb);
    if (!this.isModificar) {
      this.restServicio.insertarServicioWeb(this.servicioWeb).subscribe(
        data => {
          alert("insercion exitosa ");
          this.router.navigate(['aplicacion/servicioWeb']);
        },
        error => {
          alert(JSON.stringify(error));
        }
      );
    }else{
      this.restServicio.actualizarServicioWeb(this.servicioWeb).subscribe(
        data => {
          alert("actualizacion exitosa ");
          this.router.navigate(['aplicacion/servicioWeb']);
        },
        error => {
          alert(JSON.stringify(error));
        }
      );

    }


  }




}
