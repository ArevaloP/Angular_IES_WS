import { Component, OnInit, ViewChild } from '@angular/core';
import { ImplementacionClase } from '../../../modelo/implementacion-clase';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestImplementacionClaseService } from '../../../servicio/rest-implementacion-clase.service';
import { UploadLibreriaComponent } from '../../utilidad/upload-libreria/upload-libreria.component';

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

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild('libreriaZip', { static: false }) public libreriaZip: UploadLibreriaComponent;

  constructor(
    public fb: FormBuilder,
    public restImplementacionClase: RestImplementacionClaseService,
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

    this.inicializarValidacion();
  }





  public inicializarValidacion() {

    this.fGeneral = this.fb.group({
      codigo: [this.implementacion.codigo, Validators.required],
      nombre: [this.implementacion.nombre, Validators.required],
      tipoServicio: [this.implementacion.tipoServicio, Validators.required],
      estado: [this.implementacion.estado, Validators.required],
      clase: [this.implementacion.clase, Validators.required],


    }
    );

  }






  public irRegistar() {
    this.implementacion.estado = "ACTIVO";
    this.implementacion.registradoPor = this.usuarioVO.oid;
    this.implementacion.usuarioRealiza = this.usuarioVO.name;
    this.implementacion.cambioImagen=this.libreriaZip.cambioFichero;
    if(this.libreriaZip.cambioFichero){
      this.implementacion.nombreFile=this.libreriaZip.uploadResponse.filePath;
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





}
