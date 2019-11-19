import { Component, OnInit } from '@angular/core';
import { RestUserWebService } from '../../../servicio/rest-user-web.service';
import { DetalleEjecucion } from '../../../modelo/detalle-ejecucion';
import { UserWebService } from '../../../modelo/user-web-service';
import { Alert } from 'selenium-webdriver';


declare var PR;
declare var $;
@Component({
  selector: 'app-ver-ejedetalle',
  templateUrl: './ver-ejedetalle.component.html',
  styleUrls: ['./ver-ejedetalle.component.scss']
})


export class VerEjedetalleComponent implements OnInit {

  public detalleVO: DetalleEjecucion;
  public usuarioWebService: UserWebService;
  public ejecucionJson:String;
  public parametroJson:String;

  constructor(
    public restDetalleEjecucion: RestUserWebService
  ) { }

  ngOnInit() {
    this.detalleVO = this.restDetalleEjecucion.getDetalleEjecucion();
    this.consultarUsuario();
  }



  consultarUsuario() {

    //alert("consultarUsuario");
    this.restDetalleEjecucion.consultarUsuario(this.detalleVO.idUsuario).subscribe(
      data => {
        this.detalleVO.usuarioImagen = data.imagen;
        console.log("this.detalleVO.parametros",this.detalleVO.parametros);
        this.consultarDetalle();
      },
      error => {
        console.log("Ocurrio un error al consultar el usuario ", error);
      }
    )


  }



  consultarDetalle(){

    this.restDetalleEjecucion.consultarDetalle(this.detalleVO.idEjecucion).subscribe(
      data => {
        this.parametroJson=JSON.parse(data[0].parametros); //JSON.parse(JSON.stringify(this.detalleVO.parametros));
        data[0].usuarioImagen =this.detalleVO.usuarioImagen;
        this.detalleVO=data[0];
        this.consultarJsonEjecucion();
      },
      error => {
        console.log("Ocurrio un error al consultar el usuario ", error);
      }
    )

  }




  consultarJsonEjecucion() {

    this.restDetalleEjecucion.consultarJsonEjecucion(this.detalleVO.idServicio,this.detalleVO.idEjecucion).subscribe(
      data => {
        this.ejecucionJson=JSON.parse(data.data);
      },
      error => {
        console.log("Ocurrio un error al consultar el log ", error);
      }
    )


  }





  /*get code () {
    return JSON.stringify(this.someJson, null, 2);
  }

  set code (v) {
    try{
      this.someJson = JSON.parse(v);
    }
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }*/






}
