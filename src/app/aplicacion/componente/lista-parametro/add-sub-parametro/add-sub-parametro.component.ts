import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { RestEquivalenciaService } from '../../../servicio/rest-equivalencia.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-sub-parametro',
  templateUrl: './add-sub-parametro.component.html',
  styleUrls: ['./add-sub-parametro.component.scss']
})
export class AddSubParametroComponent implements OnInit {

  public fGeneral: FormGroup;
  public subParametroServicio: ParametroServicio = new ParametroServicio();

  public isModificar: boolean = false;
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listadoEquivalencia: AtributoEquivalencia[];
  public listadoListaParametro: any[];

  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    public fb: FormBuilder,
    //public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public restEquivalencia: RestEquivalenciaService,
    public router: Router

  ) { }

  ngOnInit()
  {
    if (this.restParametro.getSubParametroServicio() != null) {
      this.subParametroServicio = this.restParametro.getSubParametroServicio();
      this.isModificar = true;
    } else {
      this.subParametroServicio.tipoDato = "STRING";
      this.isModificar = false;
    }

    this.inicializarValidacion();
  }




  public async inicializarValidacion() {
    this.subParametroServicio.registradoPor = this.usuarioVO.oid;;
    this.subParametroServicio.usuarioRealiza = this.usuarioVO.name;
    //this.subParametroServicio.idListaPadre="";
    this.subParametroServicio.idListaAsociado = this.restParametro.getParametroServicio().idListaPadre;



    this.fGeneral = this.fb.group({
      firstName: [],
      orden: [this.subParametroServicio.orden, [Validators.required, Validators.maxLength(2), Validators.pattern('[0-9]*')]],
      parametro: [this.subParametroServicio.parametro, Validators.required],
      tipoDato: [this.subParametroServicio.tipoDato, Validators.required],
      longitudFormato: [this.subParametroServicio.longitudFormato, [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      descripcion: [this.subParametroServicio.descripcion],
      valorFijo: [this.subParametroServicio.valorFijo],
      aliasColumna: [this.subParametroServicio.aliasColumna, Validators.required],
      equivalencia: [this.subParametroServicio.idEquivalencia],
      listaArray: [this.subParametroServicio.idListaPadre],
      codigoLista: [Validators.required],
      nombreLista: [Validators.required]
    });

    await this.listarEquivalenciaDatos();
  }

  public irRegistrar() {
    this.subParametroServicio.registradoPor = this.usuarioVO.oid;
    this.subParametroServicio.usuarioRealiza = this.usuarioVO.name;
    //this.subParametroServicio.idServicioWeb = this.restServicio.getServicioWeb().id;


    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿Está seguro de modificar en el Array el parámetro [" + this.subParametroServicio.parametro + "]?"),
        () => this.actualizarParametro(this.subParametroServicio)
      );
    }
    else {
      this.alerta.confirmarInsertar(
        ("¿Está seguro de agregar al Array el parámetro [" + this.subParametroServicio.parametro + "]?"),
        () => this.insertarParametro(this.subParametroServicio)
      );

    }

  }

  public insertarParametro(parametroServicio) {
    this.restParametro.insertarParametroServicio(parametroServicio).subscribe(
      data => {
        this.recargarParametro();
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public actualizarParametro(parametroServicio) {
    this.restParametro.actualizarParametroServicio(parametroServicio).subscribe(
      data => {
        this.recargarParametro();
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
    this.restParametro.listarListadoSubParametros().subscribe(
      data => {
        this.listadoListaParametro = data;
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  onChange(deviceValue)
  {
    if (deviceValue > 0)
    {
      let listadoLista = this.getListaByFind(deviceValue);
      this.subParametroServicio.codigoColumna = listadoLista.codigo;
      this.subParametroServicio.nombreColumna = listadoLista.nombre;
    }
    else {
      this.subParametroServicio.codigoColumna = "";
      this.subParametroServicio.nombreColumna = "";
    }
  }

  public getListaByFind(id): any {
    return this.listadoListaParametro.find(x => x.id === id);
  }

  public recargarParametro()
  {
    let parametroServicio = true === this.isModificar ? this.restParametro.getSubParametroServicio() : this.restParametro.getParametroServicio();
    
    this.restParametro.recargarParametro( parametroServicio ).subscribe(
      data => {
        if ( true === this.isModificar )
          this.restParametro.setSubParametroServicio( data );
        else
          this.restParametro.setParametroServicio( data );

        this.router.navigateByUrl('aplicacion', { skipLocationChange: true }).then(
          () => this.router.navigate(['aplicacion/parametro/lis-sub-parametro'])
        );
      },
      error => {
        let mensaje = "Su proceso se ha realizado correctamente, aunque hay inconvenientes al recargar su información. Por favor ingrese a la funcionalidad nuevamente.\n";
        
        if ( error.error.mensaje )
          error.error.mensaje = mensaje + error.error.mensaje;
        else if ( error.message )
          error.message = mensaje + error.message;
        else
          error.message = mensaje;
        
        this.alerta.mostrarError(error);
      }
    );
  }
}