import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VentanaAlerta } from '../../../modelo/ventana-alerta';
import { Router } from '@angular/router';
import { RestErrorService } from '../../../servicio/rest-error.service';


@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.scss']
})
export class VentanaModalComponent implements OnInit {



  @ViewChild('dangerModal', { static: false }) public dangerModal: ModalDirective;
  @ViewChild('successModal', { static: false }) public successModal: ModalDirective;
  @ViewChild('primaryModal', { static: false }) public primaryModal: ModalDirective;
  @ViewChild('prontmodal', { static: false }) public prontmodal: ModalDirective;
  @ViewChild('warningModal', { static: false }) public warningModal: ModalDirective;
  
  promtValue:String="";



  callback: any;
  ventana: VentanaAlerta = new VentanaAlerta();

  constructor(
    public router: Router,
    public restError:RestErrorService
    ) {
  }


  ngOnInit() {
  }


  public confirmarEliminar(mensaje, callback) {
    this.ventana.titulo = "Eliminar registro";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Aceptar";
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

    if (error.status == 403) {
        error.error="El acceso al recurso especificado ha sido prohibido.";
        this.restError.setError(error);
        this.router.navigate(['500']);
    } else {
      this.dangerModal.show();
    }
    //this.callback = callback;
  }


  public errorCerrar(error) {
    this.restError.setError(error);
    this.router.navigate(['500']);
  }

  public confirmarInsertar(mensaje, callback) {
    this.ventana.titulo = "Agregar registro ";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
    this.ventana.botonRegistar = true;
    this.ventana.mensaje = mensaje;
    this.successModal.show();
    this.callback = callback;
  }

  public confirmarActualizar(mensaje, callback) {
    this.ventana.titulo = "Modificar registro";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
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


  public accionPront() {
    this.callback(this.promtValue);
    this.prontmodal.hide();
  }
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  public statusConexion(jdbc: any) {
    this.ventana.titulo = "Prueba de conexión";
    this.ventana.msgBotonCancelar = "Cerrar";
    this.ventana.botonRegistar = false;
    this.successModal.show();
    this.ventana.mensaje = "" + jdbc.data.productName + " conexión ok <br>" + jdbc.data.productVersion + "<br>" + jdbc.data.driverName;
  }

  public mostarMensaje(titulo:string,texto: any) {
    this.ventana.titulo =titulo ;
    this.ventana.msgBotonCancelar = "Cerrar";
    this.ventana.botonRegistar = false;
    this.successModal.show();
    this.ventana.mensaje =texto;
  }

  public mostarAdvertencia(titulo:string,texto: any) {
    this.ventana.titulo =titulo ;
    this.ventana.msgBotonCancelar = "Cerrar";
    this.ventana.botonRegistar = false;
    this.warningModal.show();
    this.ventana.mensaje =texto;
  }

  public irAgregarVentana(mensaje,callback) {
    this.ventana.titulo = "Agregar usuario";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
    this.ventana.botonRegistar = true;
    this.ventana.mensaje = mensaje;
    this.prontmodal.show();
    this.callback = callback;
  }
}