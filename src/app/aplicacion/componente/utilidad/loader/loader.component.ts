import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { RestUserAuthService } from '../../../servicio/rest-user-auth.service';
import { Router } from '@angular/router';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';
import { RestErrorService } from '../../../servicio/rest-error.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

 // @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  constructor(
    private router: Router,
    private authRest: RestUserAuthService,
    private restError:RestErrorService
  ) { }


  ngOnInit() {
    this.validarAccesoGrupo();
  }



  private validarAccesoGrupo() {
    //console.log(this.authRest.getUser());
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



  private administarAplicacion(group) {
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








}
