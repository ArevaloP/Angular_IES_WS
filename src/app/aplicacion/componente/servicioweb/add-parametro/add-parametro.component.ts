import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { Router } from '@angular/router';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { RestEquivalenciaService } from '../../../servicio/rest-equivalencia.service';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ListaParametro } from '../../../modelo/lista-parametro';

@Component({
  selector: 'app-add-parametro',
  templateUrl: './add-parametro.component.html',
  styleUrls: ['./add-parametro.component.scss']
})
export class AddParametroComponent implements OnInit {

  public fGeneral: FormGroup;
  public parametroServicio: ParametroServicio = new ParametroServicio();
  public isModificar: boolean = false;
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listadoEquivalencia: AtributoEquivalencia[];
  public listadoListaParametro: any[];
  public listaParametro: ListaParametro;

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    public fb: FormBuilder,
    public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public restEquivalencia: RestEquivalenciaService,
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
    //this.listarEquivalenciaDatos();
  }




  public async inicializarValidacion() {
    this.parametroServicio.registradoPor = this.usuarioVO.oid;;
    this.parametroServicio.usuarioRealiza = this.usuarioVO.name;

    this.fGeneral = this.fb.group({
      firstName: [],
      orden: [this.parametroServicio.orden, [Validators.required, Validators.maxLength(2), Validators.pattern('[0-9]*')]],
      parametro: [this.parametroServicio.parametro, Validators.required],
      tipoDato: [this.parametroServicio.tipoDato, Validators.required],
      longitudFormato: [this.parametroServicio.longitudFormato, [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      descripcion: [this.parametroServicio.descripcion],
      valorFijo: [this.parametroServicio.valorFijo],
      aliasColumna: [this.parametroServicio.aliasColumna, Validators.required],
      equivalencia: [this.parametroServicio.idEquivalencia],
      listaArray: [this.parametroServicio.idListaPadre],
      codigoLista: [Validators.required],
      nombreLista: [Validators.required],
      obligatorio: [this.parametroServicio.obligatorio]
    });

    await this.listarEquivalenciaDatos();
    await this.listarListadoSubParametros();


  }

  public irRegistrar() {
    this.parametroServicio.registradoPor = this.usuarioVO.oid;
    this.parametroServicio.usuarioRealiza = this.usuarioVO.name;
    this.parametroServicio.idServicioWeb = this.restServicio.getServicioWeb().id;

    console.log(this.parametroServicio);

    if (this.parametroServicio.tipoDato == 'ARRAY'||this.parametroServicio.tipoDato == 'OBJETO') {
      if ( !this.parametroServicio.nombreColumna || "" === this.parametroServicio.nombreColumna.trim()
          || !this.parametroServicio.codigoColumna || "" === this.parametroServicio.codigoColumna.trim() ) {
        this.alerta.mostarAdvertencia("Advertencia", "Es necesario que ingrese información para los campos código de lista y nombre de lista, esto solo aplica para parámetros de tipo Array");
        return;
      }
    }

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

  public insertarParametro(servicioWeb) {
    this.restParametro.insertarParametroServicio(servicioWeb).subscribe(
      data => {
        this.router.navigate(['aplicacion/servicio/lis-parametro']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public actualizarParametro(servicioWeb) {
    this.restParametro.actualizarParametroServicio(servicioWeb).subscribe(
      data => {
        this.router.navigate(['aplicacion/servicio/lis-parametro']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }




  public listarEquivalenciaDatos() {

    //alert("listarEquivalenciaDatos");
    this.restEquivalencia.listarEntidades().subscribe(
      data => {
        this.listadoEquivalencia = data;
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )

  }


  public listarListadoSubParametros()
  {
    this.listaParametro = new ListaParametro();
    this.listaParametro.id = this.parametroServicio.idListaPadre;
    //alert("listarEquivalenciaDatos");
    this.restParametro.listarListadoSubParametros( this.listaParametro ).subscribe(
      data => {
        this.listadoListaParametro = data;
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )

  }



  onChange(deviceValue) {
    if (deviceValue > 0) {
      let listadoLista = this.getListaByFind(deviceValue);
      this.parametroServicio.codigoColumna = listadoLista.codigo;
      this.parametroServicio.nombreColumna = listadoLista.nombre;
    } else {
      this.parametroServicio.codigoColumna = "";
      this.parametroServicio.nombreColumna = "";
    }

  }


  public getListaByFind(id): any {
    return this.listadoListaParametro.find(x => x.id === id);
  }



}