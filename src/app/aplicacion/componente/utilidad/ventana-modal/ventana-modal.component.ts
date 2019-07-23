import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VentanaAlerta } from '../../../modelo/ventana-alerta';
import { JdbcConexion } from '../../../modelo/jdbc-conexion';


@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.scss']
})
export class VentanaModalComponent implements OnInit {



  @ViewChild('dangerModal', { static: false }) public dangerModal: ModalDirective;
  @ViewChild('successModal', { static: false }) public successModal: ModalDirective;
  @ViewChild('primaryModal', { static: false }) public primaryModal: ModalDirective;





  callback: any;
  ventana: VentanaAlerta = new VentanaAlerta();

  constructor() {
  }


  ngOnInit() {
  }


  public confirmarEliminar(mensaje, callback) {
    this.ventana.titulo = "Eliminar Registro";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registar";
    this.ventana.botonDelete = true;
    this.ventana.mensaje = mensaje;
    this.dangerModal.show();
    this.callback = callback;
  }



  public mostrarError(error) {
    this.ventana.titulo = "Ocurrio un error";
    this.ventana.msgBotonCancelar = "Cerrar";
    this.ventana.botonDelete = false;
    this.ventana.mensaje = error.error.mensaje || error.message;
    this.dangerModal.show();
    //this.callback = callback;
  }




  public confirmarInsertar(mensaje, callback) {
    this.ventana.titulo = "Agregar Registro ";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registar";
    this.ventana.botonRegistar = true;
    this.ventana.mensaje = mensaje;
    this.successModal.show();
    this.callback = callback;
  }

  public confirmarActualizar(mensaje, callback) {
    this.ventana.titulo = "Modificar Registro";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registar";
    this.ventana.botonRegistar = true;
    this.ventana.mensaje = mensaje;
    this.primaryModal.show();
    this.callback = callback;
  }




  public accionSuccess() {
    this.callback();
    this.successModal.hide();
  }

  public accionPrimary() {
    this.callback();
    this.primaryModal.hide();
  }


  public accionDanger() {
    this.callback();
    this.dangerModal.hide();
  }


  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  public statusConexion(jdbc:any) {
    
    this.ventana.titulo = "Status Conexión";
    this.ventana.msgBotonCancelar = "Cerrar";
    this.ventana.botonRegistar = false;
    this.successModal.show();
    this.ventana.mensaje = ""+jdbc.data.productName + " Conexion Ok <br>" + jdbc.data.productVersion + "<br>" + jdbc.data.driverName;
  }



}
