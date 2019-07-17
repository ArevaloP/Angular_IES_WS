import { Component, OnInit, Input } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';

@Component({
  selector: 'app-lis-aplicacion-usuario',
  templateUrl: './lis-aplicacion-usuario.component.html',
  styleUrls: ['./lis-aplicacion-usuario.component.scss']
})
export class LisAplicacionUsuarioComponent implements OnInit {


  @Input() listaUsuarioWs: UserWebService[];
  //@ HostBinding ( 'class' ) className ="box box-primary";
  @Input() searchText: String;

  constructor(
    private restUsuario: RestUserWebService,

  ) { }

  ngOnInit() {
  }



  private actualizarEstadoUsuario(index: number, eve: any) {

    this.listaUsuarioWs[index].checkeado = eve;
    this.listaUsuarioWs[index].registradoPor = "reg_";
    this.listaUsuarioWs[index].usuarioRealiza = "code_";

    if (this.listaUsuarioWs[index].idAplicacion!="-1") {
      if (eve) {
        this.restUsuario.actualizarUsuarioWebXaplicacion(this.listaUsuarioWs[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaUsuarioWs[index].checkeado = !eve;
          }
        );
      } else if (!eve) {

        this.restUsuario.eliminarUsuarioWebXaplicacion(this.listaUsuarioWs[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaUsuarioWs[index].checkeado = !eve;
          }
        );
      }
    }

  }


}
