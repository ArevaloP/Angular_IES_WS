import { Component, OnInit, ViewChild, ɵConsole, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-jdbc-servicio',
  templateUrl: './jdbc-servicio.component.html',
  styleUrls: ['./jdbc-servicio.component.scss']
})
export class JdbcServicioComponent implements OnInit {

  public fGeneral: FormGroup;
  public jdbcConexion: JdbcConexion = new JdbcConexion();
  public isModificar: boolean = false;
  public isReadOnly: boolean = false;
  public isNuevaConexion: boolean = false;
  public listaConexionesExistente: JdbcConexion[];
  public indexConexion: number;
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;



  constructor(
    public fb: FormBuilder,
    public restJdbcConexion: RestJdbcConexionService,
    public router: Router
  ) {

  }



  ngOnInit() {
    this.inicializarValidacion();
    this.listarJdbcConexion();
  }


  public setObjetoConexion(jdbcConexion: JdbcConexion) {
    this.jdbcConexion = jdbcConexion||new JdbcConexion();
  }


  public getObjetoConexion() {

    //console.log("GET_CONEXION:",this.jdbcConexion);
    if(this.jdbcConexion.id==null){
      this.jdbcConexion.estado = "ACTIVO";
      this.jdbcConexion.tipoConexion = "SID";
      this.jdbcConexion.formatoConexion = "URLSERVIDOR";
    }
    if(this.jdbcConexion.codigo===undefined){
      this.jdbcConexion=null;
    }
    console.log("VALIDAR GET_CONEXION:",this.jdbcConexion);

    return this.jdbcConexion;
  }


  public inicializarValidacion() {

    this.fGeneral = this.fb.group({
      codigo: [this.jdbcConexion.codigo, Validators.required],
      nombre: [this.jdbcConexion.nombre, Validators.required],
      serverUrl: [this.jdbcConexion.serverUrl, Validators.required],
      puerto: [this.jdbcConexion.puerto, Validators.required],
      serviciosIdAlias: [this.jdbcConexion.codigo, Validators.required],
      userId: [this.jdbcConexion.serviciosIdAlias, Validators.required],
      password: [this.jdbcConexion.password, Validators.required],
      tipoBaseDatos: [this.jdbcConexion.tipoBaseDatos, Validators.required],
      otraconexion: [this.indexConexion || 0],
      nuevaconexion: [this.isNuevaConexion]
    }
    );

  }



  public actualizarCampos(event) {


    if (!this.isNuevaConexion) {
      this.isReadOnly = true;
      this.isNuevaConexion = false;
      this.isModificar = true;
      if (this.indexConexion) {
        this.jdbcConexion = this.listaConexionesExistente[this.indexConexion];
      }
    }


  }

  public crearConexionNueva(event) {
    this.indexConexion = 0;
    this.isModificar = false;
    this.jdbcConexion = new JdbcConexion();
    this.isReadOnly = !this.isNuevaConexion;
    this.inicializarValidacion();
    //alert(JSON.stringify(this.jdbcConexion));
  }





  public irRegistar() {
    this.jdbcConexion.estado = "ACTIVO";
    this.jdbcConexion.registradoPor = this.usuarioVO.oid;
    this.jdbcConexion.usuarioRealiza = this.usuarioVO.name;
    this.jdbcConexion.tipoConexion = "SID";
    this.jdbcConexion.formatoConexion = "URLSERVIDOR";
    this.jdbcConexion.descripcion = this.jdbcConexion.nombre;

    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿ Esta seguro de eliminar el servicio [" + this.jdbcConexion.nombre + "]  ?"),
        () => this.actualizarJdbcConexion(this.jdbcConexion)
      );
    } else {

      this.alerta.confirmarInsertar(
        ("¿ Esta seguro de eliminar el servicio [" + this.jdbcConexion.nombre + "]  ?"),
        () => this.insertarJdbcConexion(this.jdbcConexion)
      );
    }
  }




  public listarJdbcConexion() {
    this.restJdbcConexion.listarJdbcConexion().subscribe(
      data => {
        this.listaConexionesExistente = data;
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }


  public insertarJdbcConexion(jdbcConexion) {
    this.restJdbcConexion.insertarJdbcConexion(jdbcConexion).subscribe(
      data => {
        this.listarJdbcConexion();
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }


  public actualizarJdbcConexion(jdbcConexion) {

    this.restJdbcConexion.actualizarJdbcConexion(jdbcConexion).subscribe(
      data => {
        this.listarJdbcConexion();
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );


  }



  public testearJdbcConexion() {
    this.restJdbcConexion.testearJdbcConexion(this.jdbcConexion).subscribe(
      data => {
        this.alerta.statusConexion(data);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }


}
