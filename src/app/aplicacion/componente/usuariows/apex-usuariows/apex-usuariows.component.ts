import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { AplicacionExterna } from '../../../modelo/aplicacion-externa';

@Component({
  selector: 'app-apex-usuariows',
  templateUrl: './apex-usuariows.component.html',
  styleUrls: ['./apex-usuariows.component.scss']
})
export class ApexUsuariowsComponent implements OnInit {

  @Input() userWebService: UserWebService;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;
  private usuarioVO:any =JSON.parse(sessionStorage.getItem("user.app.local"));
  
  public listaAplicacion: any[];
  p: number = 1;

  constructor(
    private restUsuario: RestUserWebService

  ) { }

  ngOnInit() {
    this.listarAplicacionUsuario();
  }

  public listarAplicacionUsuario() {
    this.restUsuario.listarAplicacionesxUsuario(this.userWebService).subscribe(
      data => {
        this.listaAplicacion = data;
      },
      error => {
        //alert(JSON.stringify(error));
        this.alerta.mostrarError(error);
      }
    );
  }




  private actualizarEstadoUsuario(index: number, eve: any) {

    this.userWebService.checkeado = eve;
    this.userWebService.registradoPor = this.usuarioVO.oid;
    this.userWebService.usuarioRealiza = this.usuarioVO.name;
    let apex:AplicacionExterna= this.listaAplicacion[index];
    this.userWebService.idAplicacion=apex.id;

    if (this.userWebService.idAplicacion != "-1") {
      if (eve) {
        this.restUsuario.actualizarUsuarioWebXaplicacion(this.userWebService).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.userWebService.checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      } else if (!eve) {

        this.restUsuario.eliminarUsuarioWebXaplicacion(this.userWebService).subscribe(
          data => {
            console.log("El registro se actualizo exitosamente");
          },
          error => {
            this.userWebService.checkeado = !eve;
            this.alerta.mostrarError(error);
          }
        );
      }
    }

  }





}
