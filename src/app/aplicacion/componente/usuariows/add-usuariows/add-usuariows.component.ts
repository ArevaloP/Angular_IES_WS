import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { Router } from '@angular/router';
import { UserWebService } from '../../../modelo/user-web-service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { UploadFileComponent } from '../../utilidad/upload-file/upload-file.component';
import { Alert } from 'selenium-webdriver';
import { LisAplicacionUsuarioComponent } from '../../aplicacionext/lis-aplicacion-usuario/lis-aplicacion-usuario.component';

@Component({
  selector: 'app-add-usuariows',
  templateUrl: './add-usuariows.component.html',
  styleUrls: ['./add-usuariows.component.scss']
})
export class AddUsuariowsComponent implements OnInit {


  public fGeneral: FormGroup;
  public isModificar: boolean = false;
  public userWebService: UserWebService = new UserWebService();
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  @ViewChild('fileAvatar', { static: false }) public fileAvatar: UploadFileComponent;
  @ViewChild('lstaplicacion', { static: false }) public lstaplicacion: LisAplicacionUsuarioComponent;

  constructor(
    public fb: FormBuilder,
    public restUsuario: RestUserWebService,
    public router: Router

  ) { }

  ngOnInit() {



    if (this.restUsuario.getUserWebService() != null) {
      this.userWebService = this.restUsuario.getUserWebService();
      this.isModificar = true;
    } else {
      this.userWebService.estado = "ACTIVO";
      this.isModificar = false;
    }
    this.inicializarValidacion();

  }


  public inicializarValidacion() {

    this.userWebService.registradoPor = this.usuarioVO.oid;;
    this.userWebService.usuarioRealiza = this.usuarioVO.name;;

    this.fGeneral = this.fb.group({
      usuario: [this.userWebService.usuario, Validators.required],
      password: [this.userWebService.password, Validators.required],
      estado: [this.userWebService.estado, Validators.required],
      nombre: [this.userWebService.nombre, Validators.required],
      email: [this.userWebService.email, Validators.required],

    });

  }




  public irRegistar() {


    if (this.fileAvatar.cambioImagen) {
      let imagen: any = this.fileAvatar.uploadResponse;
      this.userWebService.imagen = "data:image/png;base64," + imagen.data;
    }

    if (this.isModificar) {
      this.alerta.confirmarActualizar(
        ("¿ Esta seguro de modificar el usuario [" + this.userWebService.nombre + "]  ?"),
        () => this.actualizarUsuarioWs(this.userWebService)
      );
    } else {
      this.alerta.confirmarInsertar(
        ("¿ Esta seguro de agregar el usuario [" + this.userWebService.nombre + "]  ?"),
        () => this.insertarUsuarioWs(this.userWebService)
      );
    }

  }



  public insertarUsuarioWs(userWebService) {

    this.restUsuario.insertarUserWebService(userWebService).subscribe(
      data => {
        this.router.navigate(['aplicacion/privilegio/usuarioWs']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );


  }



  public actualizarUsuarioWs(userWebService) {
    this.restUsuario.actualizarUserWebService(userWebService).subscribe(
      data => {
        this.router.navigate(['aplicacion/privilegio/usuarioWs']);
      },
      error => {
        this.alerta.mostrarError(error);
      }
    );

  }





}
