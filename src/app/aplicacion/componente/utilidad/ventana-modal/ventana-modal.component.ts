import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VentanaAlerta } from '../../../modelo/ventana-alerta';
import { Router } from '@angular/router';
import { RestErrorService } from '../../../servicio/rest-error.service';
import { XlsParametroComponent } from '../../servicioweb/xls-parametro/xls-parametro.component';
import { XlsEquivalenciaComponent } from '../../equivalencia/xls-equivalencia/xls-equivalencia.component';


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


  @ViewChild('fileUpload', { static: false }) public agregarXls: ModalDirective;
  @ViewChild('equivalencia', { static: false }) public equivalenciaXls: ModalDirective;

  @ViewChild('xlsparam', { static: false }) public xlsparam: XlsParametroComponent;
  @ViewChild('xlsEquiva', { static: false }) public xlsEquiva: XlsEquivalenciaComponent;



  promtValue: String = "";
  nombreEquivalencia: boolean;


  callback: any;
  callbackParam: any;
  ventana: VentanaAlerta = new VentanaAlerta();

  public mostrarBotones: Boolean;

  constructor(
    public router: Router,
    public restError: RestErrorService
  ) {
  }


  ngOnInit() {
    this.mostrarBotones = true;
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
        error.error = "El acceso al recurso especificado ha sido prohibido.";
        this.restError.setError(error);
        this.router.navigate(['500']);
      } if (error.status == 401) {
        this.router.navigate(['load']);
      } else {
        this.dangerModal.show();
      }

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


  public confirmarCopiar(mensaje, callback) {
    this.ventana.titulo = "Copiar Registro";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
    this.ventana.botonRegistar = true;
    this.ventana.mensaje = mensaje;
    this.successModal.show();
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

  public mostarMensaje(titulo: string, texto: any) {
    this.ventana.titulo = titulo;
    this.ventana.msgBotonCancelar = "Cerrar";
    this.ventana.botonRegistar = false;
    this.successModal.show();
    this.ventana.mensaje = texto;
  }

  public mostarAdvertencia(titulo: string, texto: any) {
    this.ventana.titulo = titulo;
    this.ventana.msgBotonCancelar = "Cerrar";
    this.ventana.botonRegistar = false;
    this.warningModal.show();
    this.ventana.mensaje = texto;
  }

  public irAgregarVentana(mensaje, callback) {
    this.ventana.titulo = "Agregar usuario";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
    this.ventana.botonRegistar = true;
    this.ventana.mensaje = mensaje;
    this.prontmodal.show();
    this.callback = callback;
  }



  public agregarParametroXlsVentana(servicio, callback) {
    this.callbackParam = callback;
    this.xlsparam.inicializarVariables(servicio);
    this.ventana.titulo = "Cargar parametros por .xls";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
    this.ventana.botonRegistar = true;
    this.ventana.usaParametro = true;
    this.agregarXls.show();
    this.callback = (callbackParam) => this.accionRegistrarParametro(callbackParam);
  }


  public agregarEquivalenciaXlsVentana(entidad, callback) {
    this.callbackParam = callback;
    this.nombreEquivalencia = false;
    this.xlsEquiva.inicializarVariables(entidad);
    this.ventana.titulo = "Cargar equivalencia por .xls";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
    this.ventana.usaParametro = false;
    //this.ventana.mensaje = mensaje;
    this.equivalenciaXls.show();
    this.callback = (callbackParam) => this.accionRegistrarEquivalencia(callbackParam);
  }



  public agregarParametroArrayXlsVentana(servicio, callback) {
    this.callbackParam = callback;
    this.xlsparam.inicializarVariablesArray(servicio);
    this.ventana.titulo = "Cargar array  de parametros por .xls";
    this.ventana.msgBotonCancelar = "Cancelar";
    this.ventana.msgBotonRegistar = "Registrar";
    this.ventana.botonRegistar = true;
    this.ventana.usaParametro = true;
    this.agregarXls.show();
    this.callback = (callbackParam) => this.accionRegistrarParametro(callbackParam);
  }




  public async accionRegistrarParametro(callback) {
    this.xlsparam.procesarArchivo(callback);
    this.agregarXls.hide();
  }





  public async accionRegistrarEquivalencia(callback) {

    //alert("registrar .....");
    if (this.xlsEquiva.nombreAtributo) {
      this.mostrarBotones = false;
      this.nombreEquivalencia = false;
      this.xlsEquiva.procesarArchivo(callback, this.equivalenciaXls);
      // this.equivalenciaXls.hide();
    } else {
      this.nombreEquivalencia = true;
    }

  }



}