import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadParametroComponent } from '../../utilidad/upload-parametro/upload-parametro.component';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { Router } from '@angular/router';
import { ServicioWeb } from '../../../modelo/servicio-web';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { ParametroServicio } from '../../../modelo/parametro-servicio';

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
  public parametroArray: ParametroServicio;
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


  public inicializarVariablesArray(servicio: ServicioWeb) {
    this.servicioWeb = servicio;
    this.servicioWeb = this.restServicio.getServicioWeb();
    this.servicioWeb.registradoPor = this.usuarioVO.oid;
    this.servicioWeb.usuarioRealiza = this.usuarioVO.name;
   
    this.parametroArray= this.restParametro.getParametroServicio();
    this.servicioWeb.idArray=this.parametroArray.idListaPadre;
    this.servicioWeb.id=null;
  }



  public procesarArchivo(callback) {


    if (this.parametroUpload.cambioFichero) {
      this.servicioWeb.contexto = this.parametroUpload.uploadResponse.filePath;
      this.servicioWeb.hoja=(this.parametroUpload.uploadResponse.page-1)||0;

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
