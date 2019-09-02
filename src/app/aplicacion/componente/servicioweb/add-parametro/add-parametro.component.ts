import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { Router } from '@angular/router';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-add-parametro',
  templateUrl: './add-parametro.component.html',
  styleUrls: ['./add-parametro.component.scss']
})
export class AddParametroComponent implements OnInit {

  public fGeneral: FormGroup;
  public parametroServicio: ParametroServicio = new ParametroServicio();
  public isModificar: boolean = false;
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    public fb: FormBuilder,
    public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public router: Router

  ) { }

  ngOnInit() {
    if (this.restParametro.getParametroServicio() != null) {
      this.parametroServicio = this.restParametro.getParametroServicio();
      this.isModificar = true;
    } else {
      this.parametroServicio.tipoDato = "STRING";
      this.isModificar = false;
    }
    //console.log("SERVICIO:(" + this.isModificar + ")", this.servicioWeb);
    this.inicializarValidacion();
  }

  public inicializarValidacion()
  {
    this.parametroServicio.registradoPor = this.usuarioVO.oid;;
    this.parametroServicio.usuarioRealiza = this.usuarioVO.name;

    this.fGeneral = this.fb.group({
      firstName:[],
      orden: [this.parametroServicio.orden, [Validators.required, Validators.maxLength(2), Validators.pattern('[0-9]*')]],
      parametro: [this.parametroServicio.parametro, Validators.required],
      tipoDato: [this.parametroServicio.tipoDato, Validators.required],
      longitudFormato: [this.parametroServicio.longitudFormato, [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      descripcion: [this.parametroServicio.descripcion],
      valorFijo: [this.parametroServicio.valorFijo],
      aliasColumna: [this.parametroServicio.aliasColumna, Validators.required]
    });
  }

  public irRegistrar()
  {
    this.parametroServicio.registradoPor = this.usuarioVO.oid;
    this.parametroServicio.usuarioRealiza = this.usuarioVO.name;
    this.parametroServicio.idServicioWeb = this.restServicio.getServicioWeb().id;

    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿Está seguro de modificar el parámetro [" + this.parametroServicio.parametro + "]?"),
        () => this.actualizarParametro(this.parametroServicio)
      );
    } else {
      this.alerta.confirmarInsertar(
        ("¿Está seguro de agregar el parámetro [" + this.parametroServicio.parametro + "]?"),
        () => this.insertarParametro(this.parametroServicio)
      );

    }

  }

  public insertarParametro(servicioWeb)
  {
    this.restParametro.insertarParametroServicio( servicioWeb ).subscribe(
      data => {
        this.router.navigate(['aplicacion/servicio/lis-parametro']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public actualizarParametro(servicioWeb)
  {
    this.restParametro.actualizarParametroServicio(servicioWeb).subscribe(
      data => {
        this.router.navigate(['aplicacion/servicio/lis-parametro']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }
}