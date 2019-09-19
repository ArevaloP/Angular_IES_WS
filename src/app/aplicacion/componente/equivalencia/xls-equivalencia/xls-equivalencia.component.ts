import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadParametroComponent } from '../../utilidad/upload-parametro/upload-parametro.component';
import { VentanaModalComponent } from '../../utilidad/ventana-modal/ventana-modal.component';
import { AtributoEquivalencia } from '../../../modelo/atributo-equivalencia';
import { RestEquivalenciaService } from '../../../servicio/rest-equivalencia.service';
import { Router } from '@angular/router';
import { RestDetalleEquivalenciaService } from '../../../servicio/rest-detalle-equivalencia.service';

@Component({
  selector: 'app-xls-equivalencia',
  templateUrl: './xls-equivalencia.component.html',
  styleUrls: ['./xls-equivalencia.component.scss']
})
export class XlsEquivalenciaComponent implements OnInit {

  @ViewChild('parametroComponente', { static: false }) public parametroUpload: UploadParametroComponent;
  @ViewChild('alerta', { static: false }) public alerta: VentanaModalComponent;

  public usuarioVO: any = JSON.parse(sessionStorage.getItem("user.app.local"));
  public atributoEquivalencia: AtributoEquivalencia;
  public tipoCarga:String ="equivalencia";
  public nombreAtributo:String;


  constructor(
    public restEquivalencia: RestEquivalenciaService,
    public restDetalle: RestDetalleEquivalenciaService,
    public router: Router
  ) { }

  ngOnInit() {

  }


  public inicializarVariables(atributoEquivalencia: AtributoEquivalencia) {
    this.atributoEquivalencia = atributoEquivalencia;
    this.atributoEquivalencia.registradoPor = this.usuarioVO.oid;
    this.atributoEquivalencia.usuarioRealiza = this.usuarioVO.name;

  }


  public procesarArchivo(callback) {

    
    if (this.parametroUpload.cambioFichero) {
      this.atributoEquivalencia.nombre=this.nombreAtributo;
      this.atributoEquivalencia.archivo = this.parametroUpload.uploadResponse.filePath;
      console.log("this.servicioWeb", this.atributoEquivalencia);
      this.restDetalle.cargarArchivoDetalleEquivalencia(this.atributoEquivalencia).subscribe(
        data => {
          this.restDetalle.setRespuesta(true);
          this.restDetalle.setInfoData(data);
          callback();
        },
        error => {
          this.restDetalle.setRespuesta(false);
          this.restDetalle.setInfoData(error);
          callback();
        }
      )
    }

  }







}
