import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-lis-aplicacion-usuario',
  templateUrl: './lis-aplicacion-usuario.component.html',
  styleUrls: ['./lis-aplicacion-usuario.component.scss']
})
export class LisAplicacionUsuarioComponent implements OnInit {


  @Input() listaUsuarioWs: UserWebService[];
  @Input() searchText: String;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  public usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));	
  p: number = 1;
  p2: number = 1;
  
  constructor(
    public restUsuario: RestUserWebService,

  ) { }

  ngOnInit() {
  }



  public actualizarEstadoUsuario(index: number, eve: any) {

    this.listaUsuarioWs[index].checkeado = eve;
    this.listaUsuarioWs[index].registradoPor = this.usuarioVO.oid;
    this.listaUsuarioWs[index].usuarioRealiza = this.usuarioVO.name;

    if (this.listaUsuarioWs[index].idAplicacion!="-1") {
      if (eve) {
        this.restUsuario.actualizarUsuarioWebXaplicacion(this.listaUsuarioWs[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaUsuarioWs[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      } else if (!eve) {

        this.restUsuario.eliminarUsuarioWebXaplicacion(this.listaUsuarioWs[index]).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.listaUsuarioWs[index].checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      }
    }

  }


}
