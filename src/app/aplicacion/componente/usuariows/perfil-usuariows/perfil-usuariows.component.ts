import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UploadFileComponent } from '../../utilidad/upload-file/upload-file.component';
import { UserWebService } from '../../../modelo/user-web-service';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-perfil-usuariows',
  templateUrl: './perfil-usuariows.component.html',
  styleUrls: ['./perfil-usuariows.component.scss']
})
export class PerfilUsuariowsComponent implements OnInit {

  @Input() fileAvatar: UploadFileComponent;
  @Input() userWebService: UserWebService;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public newPassword: String;

  constructor(
    public restUserWebService: RestUserWebService
  ) { }

  ngOnInit() {

  }

  cambiarContrasena() {
    //alert("cambiar password");
    if(this.newPassword){
      this.userWebService.password=this.newPassword;
      this.restUserWebService.actualizarContrasenaUsuario(this.userWebService).subscribe(
        data => { 
          this.alerta.mostarMensaje("Cambiar Contraseña","La contraseña para usuario ["+this.userWebService.usuario+"] fue actualizada correctamente. <br>"+data.id);
          this.userWebService.basic=data.id;
        },
        error => {
          this.alerta.mostrarError(error);
        }
      )
    }
  }



 copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }



}
