import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { RestUserAuthService } from '../../../servicio/rest-user-auth.service';
import { Router } from '@angular/router';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';
import { RestErrorService } from '../../../servicio/rest-error.service';
import { ConfiguraServicio } from '../../../modelo/configura-servicio';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  // @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public configuraServicio = new ConfiguraServicio;

  constructor(
    public router: Router,
    public authRest: RestUserAuthService,
    public restError: RestErrorService
  ) { }


  ngOnInit() {

    //this.validarAccesoGrupo();
    this.cargarConfiguracion();
  }


  public cargarConfiguracion() {
    this.authRest.cargarConfiguracion().subscribe(
      data => {
        //alert("data:" + JSON.stringify(data));
        if (data.id === "empty") {
          this.crearGrupoAcceso();
        } else {
          sessionStorage.setItem("group-lk-acc",data.idGrupoAcceso);
          this.validarAccesoGrupo();
        }
      },
      error => {
        //alert("error:"+JSON.stringify(error));
        this.restError.setError(error);
        this.router.navigate(['500']);
      }
    )
  }




  public validarAccesoGrupo() {
    this.authRest.obtenerInformacionGrupo().subscribe(
      data => {
        this.administarAplicacion(data);
      },
      error => {
        this.restError.setError(error);
        this.router.navigate(['500']);
      }
    )
  }



  public administarAplicacion(group) {
    this.router.navigate(['aplicacion/status']);
    this.authRest.cargarInformacionAdministracion(this.authRest.getUser(), group).subscribe(
      data => {
        sessionStorage.setItem("user.app.local", JSON.stringify(this.authRest.getUser().idToken));
        sessionStorage.setItem("auth.tk.local", data.token);
        this.router.navigate(['aplicacion/status']);
      },
      error => {
        sessionStorage.removeItem("user.app.local");
        sessionStorage.removeItem("auth.tk.local");
        this.restError.setError(error);
        this.router.navigate(['500']);
      }
    )
  }



  public crearGrupoAcceso() {

    let userLog: any = this.authRest.getUser().idToken;
    this.authRest.crearGrupoAcceso(userLog.oid).subscribe(
      data => {
        //console.log("GRUPO:", data);
        this.configuraServicio.idGrupoAcceso = data.id;
        this.crearConfiguracion(
          () => this.registarConfiguracion()
        )
      },
      error => {
        this.restError.setError(error);
        this.router.navigate(['500']);
      }
    )

  }


  public registarConfiguracion() {
    this.authRest.registrarConfiguracion(this.configuraServicio).subscribe(
      data => {
        this.validarAccesoGrupo();
      },
      error => {
        this.restError.setError(error);
        this.router.navigate(['500']);
      }
    )
  }




  public crearConfiguracion(callback): void {
    let userLog: any = this.authRest.getUser().idToken;
    this.configuraServicio.usuarioRealiza = userLog.name;
    this.configuraServicio.registradoPor = userLog.oid;
    this.configuraServicio.cuentaPropietario = userLog.preferred_username;
    this.configuraServicio.activarServicios = "1"
    this.configuraServicio.urlWebService = "http://"
    this.configuraServicio.token = sessionStorage.getItem("auth.tk.local");
    callback();
  }





}
