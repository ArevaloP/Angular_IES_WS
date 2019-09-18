import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { Router } from '@angular/router';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { JdbcServicioComponent } from '../jdbc-servicio/jdbc-servicio.component';
import { RestImplementacionClaseService } from '../../../servicio/rest-implementacion-clase.service';
import { ImplementacionClase } from '../../../modelo/implementacion-clase';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';

@Component({
  selector: 'app-add-servicio-web',
  templateUrl: './add-servicio-web.component.html',
  styleUrls: ['./add-servicio-web.component.scss']
})
export class AddServicioWebComponent implements OnInit {
  public fGeneral: FormGroup;
  public servicioWeb: ServicioWeb = new ServicioWeb();
  public isModificar: boolean = false;
  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public listadoClasesSoap: ImplementacionClase[];
  public listadoClasesRest: ImplementacionClase[];
  public parametroServicio: ParametroServicio = new ParametroServicio();
  public listaParametros: ParametroServicio[];

  public isLoadServicio:boolean=false;


  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild('jdbcConexion', { static: false }) public jdbcComponente: JdbcServicioComponent;

  constructor(
    public fb: FormBuilder,
    public restServicio: RestServicioWebService,
    public restConexionJdbc: RestJdbcConexionService,
    public restImplementClase: RestImplementacionClaseService,
    public restParametro:RestParametroWebService,
    public router: Router

  ) { }

  ngOnInit() {
    
    this.isLoadServicio=true;
    if (this.restServicio.getServicioWeb() != null) {
      this.servicioWeb = this.restServicio.getServicioWeb();
      this.consultarConexionJdbc();
      this.consultarParametros();
      this.isModificar = true;
    } else {
      this.servicioWeb.estado = "ACTIVO";
      this.servicioWeb.tipo = "CONSULTA";
      this.servicioWeb.protocolo = "REST";
      this.servicioWeb.metodo = "POST";
      this.isModificar = false;
    }
    this.inicializarValidacion();
  }





  public inicializarValidacion() {

    this.servicioWeb.registradoPor = this.usuarioVO.oid;;
    this.servicioWeb.usuarioRealiza = this.usuarioVO.name;

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

    this.cargarVariableImplementacionClase();
  }



  public irRegistar() {

    this.servicioWeb.registradoPor = this.usuarioVO.oid;
    this.servicioWeb.usuarioRealiza = this.usuarioVO.name;

    console.log("servicioWeb.tipo=>",this.servicioWeb.tipo);

    //console.log(this.jdbcComponente);
    if(this.jdbcComponente.getObjetoConexion()!=null){
      this.servicioWeb.conexionJdbc = this.jdbcComponente.getObjetoConexion();
    }else{
      //alert("objeto vacio !!!");
      this.jdbcComponente.setObjetoConexion(new JdbcConexion());
    }

    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿ Esta seguro de modificar el servicio [" + this.servicioWeb.nombre + "]  ?"),
        () => this.actualizarServicio(this.servicioWeb)
      );
    } else {
      this.alerta.confirmarInsertar(
        ("¿ Esta seguro de agregar el servicio [" + this.servicioWeb.nombre + "]  ?"),
        () => this.insertarServicio(this.servicioWeb)
      );

    }

  }


  public insertarServicio(servicioWeb) {
    this.restServicio.insertarServicioWeb(servicioWeb).subscribe(
      data => {
        this.router.navigate(['aplicacion/servicio/servicioWeb']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }



  public actualizarServicio(servicioWeb) {

    this.restServicio.actualizarServicioWeb(servicioWeb).subscribe(
      data => {
        this.router.navigate(['aplicacion/servicio/servicioWeb']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

  public consultarConexionJdbc() {

    this.restConexionJdbc.consultarJdbcConexion(this.servicioWeb.idConexionJdbc).subscribe(
      data => {
        this.jdbcComponente.setObjetoConexion(data);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );
  }

  public consultarParametros()
  {
    this.parametroServicio.idServicioWeb = this.servicioWeb.id;
    this.restParametro.listarParametroEquivalencia( this.parametroServicio ).subscribe(
      data => {
        this.listaParametros = data;
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

  public cargarVariableImplementacionClase() {
    this.restImplementClase.listarImplementacionClase("SOAP").subscribe(
      data => {
        this.listadoClasesSoap = data;
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

    this.restImplementClase.listarImplementacionClase("REST").subscribe(
      data => {
        this.listadoClasesRest = data;
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }

  public cambiarOpcionTexto(event){
    let urlservicio ="http://dominio:puerto/contexto/app-integrador/aplicacion/servicio/"+this.servicioWeb.codigo;
    if(this.servicioWeb.protocolo=='REST'){
      this.servicioWeb.url=urlservicio;
    } if(this.servicioWeb.protocolo=='SOAP'){
      this.servicioWeb.url="?wsdl";
    }

  }
}