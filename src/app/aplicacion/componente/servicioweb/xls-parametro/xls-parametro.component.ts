import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadParametroComponent } from '../../utilidad/upload-parametro/upload-parametro.component';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { Router } from '@angular/router';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-xls-parametro',
  templateUrl: './xls-parametro.component.html',
  styleUrls: ['./xls-parametro.component.scss']
})
export class XlsParametroComponent implements OnInit {


  @ViewChild('parametroComponente', { static: false }) public parametroUpload: UploadParametroComponent;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public servicioWeb: ServicioWeb;
  public tipoCarga:String ="parametro";


  constructor(
    public restServicio: RestServicioWebService,
    public restParametro: RestParametroWebService,
    public router: Router
  ) { }

  ngOnInit() {

  }


  public inicializarVariables(servicio: ServicioWeb) {
    this.servicioWeb = servicio;
    this.servicioWeb = this.restServicio.getServicioWeb();
    this.servicioWeb.registradoPor = this.usuarioVO.oid;
    this.servicioWeb.usuarioRealiza = this.usuarioVO.name;

  }


  public procesarArchivo(callback) {


    if (this.parametroUpload.cambioFichero) {
      this.servicioWeb.contexto = this.parametroUpload.uploadResponse.filePath;
      console.log("this.servicioWeb", this.servicioWeb);
      this.restParametro.cargarArchivoParametroDatos(this.servicioWeb).subscribe(
        data => {
          this.restParametro.setRespuesta(true);
          this.restParametro.setInfoData(data);
          callback();
        },
        error => {
          this.restParametro.setRespuesta(false);
          this.restParametro.setInfoData(error);
          callback();
        }
      )
    }

  }



}
