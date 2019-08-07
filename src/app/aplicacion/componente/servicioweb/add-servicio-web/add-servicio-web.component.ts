import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { Router } from '@angular/router';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { JdbcServicioComponent } from '../jdbc-servicio/jdbc-servicio.component';

@Component({
  selector: 'app-add-servicio-web',
  templateUrl: './add-servicio-web.component.html',
  styleUrls: ['./add-servicio-web.component.scss']
})
export class AddServicioWebComponent implements OnInit {


  private fGeneral: FormGroup;
  private servicioWeb: ServicioWeb = new ServicioWeb();
  private isModificar: boolean = false;
  private usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild ('jdbcConexion', { static: false })  public jdbcComponente: JdbcServicioComponent;

  constructor(
    private fb: FormBuilder,
    private restServicio: RestServicioWebService,
    private restConexionJdbc: RestJdbcConexionService,
    private router: Router

  ) { }

  ngOnInit() {
    if (this.restServicio.getServicioWeb() != null) {
      this.servicioWeb = this.restServicio.getServicioWeb();
      this.consultarConexionJdbc();
      this.isModificar = true;
    } else {
      this.servicioWeb.estado = "ACTIVO";
      this.isModificar = false;
    }
    console.log("SERVICIO:(" + this.isModificar + ")", this.servicioWeb);
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
  }



  public irRegistar() {

    this.servicioWeb.registradoPor = this.usuarioVO.oid;
    this.servicioWeb.usuarioRealiza = this.usuarioVO.name;
    this.servicioWeb.conexionJdbc= this.jdbcComponente.getObjetoConexion();
    //console.log(this.servicioWeb);

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
        this.router.navigate(['aplicacion/servicioWeb']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }



  public actualizarServicio(servicioWeb) {

    this.restServicio.actualizarServicioWeb(servicioWeb).subscribe(
      data => {
        this.router.navigate(['aplicacion/servicioWeb']);
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



}
