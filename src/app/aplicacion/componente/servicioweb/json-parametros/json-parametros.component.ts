import { Component, OnInit, Input, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { RestParametroWebService } from '../../../servicio/rest-parametro-web.service';
import { ParametroServicio } from '../../../modelo/parametro-servicio';
import { RestServicioWebService } from '../../../servicio/rest-servicio-web.service';
import { ServicioWeb } from '../../../modelo/servicio-web';

declare var $;

@Component({
  selector: 'app-json-parametros',
  templateUrl: './json-parametros.component.html',
  styleUrls: ['./json-parametros.component.scss']
})

export class JsonParametrosComponent implements OnInit {


  @Input() listaParametros: ParametroServicio[];
  @Input() tipoLista: String;
  @ViewChild('myDiv', { static: false }) myDiv: ElementRef;
  @ViewChild('descargarh5', { static: false }) descargarh5: ElementRef;

  public p: any;
  public servicioWeb: ServicioWeb;
  public parametro: ParametroServicio;
  public urlzip: String;


  constructor(
    public restParametro: RestParametroWebService,
    public restServicio: RestServicioWebService,
  ) { }

  ngOnInit() {
    this.servicioWeb = this.restServicio.getServicioWeb();
    this.parametro = this.restParametro.getParametroServicio();
    if(!this.servicioWeb ) this.servicioWeb =new ServicioWeb();
  }




  copiar() {
    console.log(this.listaParametros);
    let val = this.myDiv.nativeElement.innerText;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  descargar() {

   
    let parametro = new ParametroServicio();
    parametro.idServicioWeb = this.servicioWeb.id;
    parametro.textoJson = this.myDiv.nativeElement.innerText;
    parametro.valorFijo = this.servicioWeb.codigo;
    //console.log("parametro",parametro);
    this.restParametro.descargarParametro(parametro).subscribe(
      data => {
        this.obtenerZip(data.data);
      },
      error => {
        console.log(error);
      }
    )
  }



  obtenerZip(url) {
    this.restParametro.obtenerFichero(url);
    this.downloadFile();
  }

  downloadFile() {

    this.urlzip = this.restParametro.getUrlZip();
    setTimeout(()=>{
         this.descargarh5.nativeElement.click();
    }, 500);


   

  }






}
