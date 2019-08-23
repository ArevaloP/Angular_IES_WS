import { Component, OnInit, ViewChild } from '@angular/core';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestJdbcConexionService } from '../../../servicio/rest-jdbc-conexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-jdbc-conexion',
  templateUrl: './add-jdbc-conexion.component.html',
  styleUrls: ['./add-jdbc-conexion.component.scss']
})
export class AddJdbcConexionComponent implements OnInit {

  public fGeneral: FormGroup;
  public jdbcConexion: JdbcConexion = new JdbcConexion();
  public isModificar: boolean = false;
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

    if (this.restJdbcConexion.getJdbcConexion() != null) {
      this.jdbcConexion = this.restJdbcConexion.getJdbcConexion();
      this.isModificar = true;
    } else {
      this.isModificar = false;
    }

    this.inicializarValidacion();
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
      tipoBaseDatos: [this.jdbcConexion.tipoBaseDatos, Validators.required]
    }
    );

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
        ("¿ Esta seguro de modificar la conexión [" + this.jdbcConexion.nombre + "]  ?"),
        () => this.actualizarJdbcConexion(this.jdbcConexion)
      );
    } else {

      this.alerta.confirmarInsertar(
        ("¿ Esta seguro de agregar la conexión [" + this.jdbcConexion.nombre + "]  ?"),
        () => this.insertarJdbcConexion(this.jdbcConexion)
      );
    }


  }




  public insertarJdbcConexion(jdbcConexion) {
    this.restJdbcConexion.insertarJdbcConexion(jdbcConexion).subscribe(
      data => {
        this.router.navigate(['aplicacion/jdbc-conexion']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    )
  }


  public actualizarJdbcConexion(jdbcConexion) {

    this.restJdbcConexion.actualizarJdbcConexion(jdbcConexion).subscribe(
      data => {
        this.router.navigate(['aplicacion/jdbc-conexion']);
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
