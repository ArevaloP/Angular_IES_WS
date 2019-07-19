import { Component, OnInit, ViewChild } from '@angular/core';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';
import { Router } from '@angular/router';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-add-app-externa',
  templateUrl: './add-app-externa.component.html',
  styleUrls: ['./add-app-externa.component.scss']
})
export class AddAppExternaComponent implements OnInit {


  public aplicacionExterna: AplicacionExterna = new AplicacionExterna();
  private fGeneral: FormGroup;
  private isModificar: boolean = false;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    private fb: FormBuilder,
    private restAplicacion: RestAplicacionService,
    private restServicio: RestServicioWebService,
    private restUsuario: RestUserWebService,
    private router: Router
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

    if (this.isModificar) {
      this.alerta.confirmarEliminar(
        ("¿ Esta seguro de eliminar el servicio [" + this.aplicacionExterna.nombre + "]  ?"),
        () => this.registarAplicacionExterna(this.aplicacionExterna,this.isModificar)
      );
     } else {  


     }
  }



  
  public insertarAplicacion(){


  }



  public registarAplicacionExterna(appExterna, modificar) {
    /*
    //console.log(this.aplicacionExterna);
    appExterna.registradoPor = "usua_";
    appExterna.usuarioRealiza = "nombre";
    
      this.restAplicacion.actualizarAplicacionExterna(appExterna).subscribe(
        data => {
          this.router.navigate(['aplicacion/lis-appexterna']);
        },
        error => {
          this.alerta.mostrarError(error.error);
        }
      )
    

      this.restAplicacion.insertarAplicacionExterna(appExterna).subscribe(
        data => {
          //console.log("insercion realizada correctamente !!!")
          this.router.navigate(['aplicacion/lis-appexterna']);
        },
        error => {
          this.alerta.mostrarError(error.error);
        }
      )
  }*/

  }






  public cargarListaServiciosWeb() {
    this.restServicio.listarServicioWebAplicacion(this.aplicacionExterna.id).subscribe(
      data => {
        console.log(data);
        this.aplicacionExterna.listaServicioWeb = data;
        this.restServicio.setListaServicio(data);
      },
      error => { console.log("falla la consulta de servicios web") }
    );
  }


  public cargarListaUsuarioAplicacion() {
    this.restUsuario.listarUsuarioServicioWebAplicacion(this.aplicacionExterna.id).subscribe(
      data => {
        //alert(JSON.stringify(data));
        this.aplicacionExterna.listaUsuarioAplicacion = data;
      },
      error => { console.log("falla la consulta de servicios web") }
    );
  }









}
