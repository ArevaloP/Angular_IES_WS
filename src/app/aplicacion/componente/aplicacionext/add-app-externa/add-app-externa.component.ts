import { Component, OnInit } from '@angular/core';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestAplicacionService } from '../../../servicio/rest-aplicacion.service';

@Component({
  selector: 'app-add-app-externa',
  templateUrl: './add-app-externa.component.html',
  styleUrls: ['./add-app-externa.component.scss']
})
export class AddAppExternaComponent implements OnInit {


  public aplicacionExterna: AplicacionExterna = new AplicacionExterna();
  private fGeneral: FormGroup;
  private isModificar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private restAplicacion: RestAplicacionService

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


  }


  public inicializarValidacion() {

    //console.log(this.fb);
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


  public registarAplicacionExterna() {
    // alert(JSON.stringify(this.aplicacionExterna));

    //this.aplicacionExterna.registradoPor = this.usuarioVO.id;
    //this.aplicacionExterna.usuarioRealiza = this.usuarioVO.nombre;
    //this.aplicacionExterna.aplxFechaCambio = new Date().toLocaleString();
    //this.aplicacionExterna.listaServicio = this.procesarListaServicioAdd();
    //this.aplicacionExterna.listaUsuario = this.procesarListaUsuarioAdd();

    if (this.isModificar) {
      console.log(this.aplicacionExterna.id);
      this.restAplicacion.actualizarAplicacionExterna(this.aplicacionExterna).subscribe(
        data => {
          console.log("actualizacion realizada correctamente !!!")
          //this.router.navigate(['principal/aplicacion']);
        },
        error => { console.log("falla la actualizacion del registro !!!") }
      )
    } else {
      //this.aplicacionExterna.aplxColor = "gray";
      //this.aplicacionExterna.aplxIcono = "ion ion-person-add";
      ///this.aplicacionExterna.aplxFechaCreacion = new Date().toLocaleString();

      this.restAplicacion.insertarAplicacionExterna(this.aplicacionExterna).subscribe(
        data => {
          console.log("insercion realizada correctamente !!!")
          //this.router.navigate(['principal/aplicacion']);
        },
        error => { console.log("falla la insercion del registro !!!") }
      )
    }


  }


}
