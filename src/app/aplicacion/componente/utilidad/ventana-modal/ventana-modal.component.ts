import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { VentanaAlerta } from '../../../modelo/ventana-alerta';


@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.scss']
})
export class VentanaModalComponent implements OnInit {


  
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  
  callback:any;
  ventana:VentanaAlerta=new VentanaAlerta();

  constructor() { 
  }


  ngOnInit() {
  }


  public confirmarEliminar(mensaje, callback) {
    this.ventana.titulo = "Eliminar Registro";
    this.ventana.msgBotonCancelar="Cancelar";
    this.ventana.msgBotonRegistar="Registar";
    this.ventana.botonDelete = true;
    this.ventana.mensaje = mensaje;
    this.myModal.show();
    this.callback = callback;
  }



  public mostrarError(error) {
    this.ventana.titulo = "Ocurrio un error";
    this.ventana.msgBotonCancelar="Cerrar";
    this.ventana.botonDelete = false;
    this.ventana.mensaje = error.mensaje;
    this.myModal.show();
    //this.callback = callback;
  }




  public accion(){
     this.callback();
     this.myModal.hide();
  }



}
