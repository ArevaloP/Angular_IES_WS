import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './componente/status/status.component';
import { AplicacionRoutingModule } from './aplicacion-routing-module';
import { LisAppExternaComponent } from './componente/aplicacionext/lis-app-externa/lis-app-externa.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AddAppExternaComponent } from './componente/aplicacionext/add-app-externa/add-app-externa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LisAplicacionUsuarioComponent } from './componente/aplicacionext/lis-aplicacion-usuario/lis-aplicacion-usuario.component';
import { LisAplicacionServicioComponent } from './componente/aplicacionext/lis-aplicacion-servicio/lis-aplicacion-servicio.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DataTablesModule } from 'angular-datatables';
import { LisServicioWebComponent } from './componente/servicioweb/lis-servicio-web/lis-servicio-web.component';
import { AddServicioWebComponent } from './componente/servicioweb/add-servicio-web/add-servicio-web.component';
import { AddUsuariowsComponent } from './componente/usuariows/add-usuariows/add-usuariows.component';
import { LisUsuariowsComponent } from './componente/usuariows/lis-usuariows/lis-usuariows.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { VentanaModalComponent } from './componente/utilidad/ventana-modal/ventana-modal.component';
import { JdbcServicioComponent } from './componente/servicioweb/jdbc-servicio/jdbc-servicio.component';
import { LisJdbcConexionComponent } from './componente/jdbcconexion/lis-jdbc-conexion/lis-jdbc-conexion.component';
import { AddJdbcConexionComponent } from './componente/jdbcconexion/add-jdbc-conexion/add-jdbc-conexion.component';
import { UploadFileComponent } from './componente/utilidad/upload-file/upload-file.component';
import { ApexUsuariowsComponent } from './componente/usuariows/apex-usuariows/apex-usuariows.component';
import { PerfilUsuariowsComponent } from './componente/usuariows/perfil-usuariows/perfil-usuariows.component';
import { EjecUsuariowsComponent } from './componente/usuariows/ejec-usuariows/ejec-usuariows.component';
import { LisParametroComponent } from './componente/servicioweb/lis-parametro/lis-parametro.component';
import { AddParametroComponent } from './componente/servicioweb/add-parametro/add-parametro.component';
import { AddGrupollamadoComponent } from './componente/grupollamado/add-grupollamado/add-grupollamado.component';
import { LisGrupollamadoComponent } from './componente/grupollamado/lis-grupollamado/lis-grupollamado.component';
import { AddItemgrupoComponent } from './componente/grupollamado/add-itemgrupo/add-itemgrupo.component';
import { LisItemgrupoComponent } from './componente/grupollamado/lis-itemgrupo/lis-itemgrupo.component';
import { AddClaseComponent } from './componente/implementacion/add-clase/add-clase.component';
import { LisClaseComponent } from './componente/implementacion/lis-clase/lis-clase.component';
import { UploadLibreriaComponent } from './componente/utilidad/upload-libreria/upload-libreria.component';
import { JsonParametrosComponent } from './componente/servicioweb/json-parametros/json-parametros.component';
import { LisEjedetalleComponent } from './componente/detalle-ejecucion/lis-ejedetalle/lis-ejedetalle.component';
import { VerEjedetalleComponent } from './componente/detalle-ejecucion/ver-ejedetalle/ver-ejedetalle.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TokenSessionComponent } from './componente/utilidad/token-session/token-session.component';
import { LisEquivalenciaComponent } from './componente/equivalencia/lis-equivalencia/lis-equivalencia.component';
import { AddEquivalenciaComponent } from './componente/equivalencia/add-equivalencia/add-equivalencia.component';
import { AddDetalleeqComponent } from './componente/detalle-equivalencia/add-detalleeq/add-detalleeq.component';
import { TablaParametroComponent } from './componente/servicioweb/tabla-parametro/tabla-parametro.component';
import { XlsParametroComponent } from './componente/servicioweb/xls-parametro/xls-parametro.component';
import { UploadParametroComponent } from './componente/utilidad/upload-parametro/upload-parametro.component';
import { AddCompuestoComponent } from './componente/detalle-equivalencia/add-compuesto/add-compuesto.component';
import { XlsEquivalenciaComponent } from './componente/equivalencia/xls-equivalencia/xls-equivalencia.component';
import { LisSubParametroComponent } from './componente/lista-parametro/lis-sub-parametro/lis-sub-parametro.component';
import { AddSubParametroComponent } from './componente/lista-parametro/add-sub-parametro/add-sub-parametro.component';
import { LisParametroArrayComponent } from './componente/parametros-array/lis-parametro-array/lis-parametro-array.component';
import { AddParametroArrayComponent } from './componente/parametros-array/add-parametro-array/add-parametro-array.component';
import { AddIpvalidaComponent } from './componente/ipvalida/add-ipvalida/add-ipvalida.component';
import { LisIpvalidaComponent } from './componente/ipvalida/lis-ipvalida/lis-ipvalida.component';
import { LisAplicacionIpComponent } from './componente/aplicacionext/lis-aplicacion-ip/lis-aplicacion-ip.component';




@NgModule({
  declarations: [
    StatusComponent,
    LisAppExternaComponent,
    AddAppExternaComponent,
    LisAplicacionUsuarioComponent,
    LisAplicacionServicioComponent,
    AddServicioWebComponent,
    LisServicioWebComponent,
    AddUsuariowsComponent,
    LisUsuariowsComponent,
    JdbcServicioComponent,
    LisJdbcConexionComponent,
    LisJdbcConexionComponent,
    AddJdbcConexionComponent,
    UploadFileComponent,
    ApexUsuariowsComponent,
    PerfilUsuariowsComponent,
    VentanaModalComponent,
    EjecUsuariowsComponent,
    LisParametroComponent,
    AddParametroComponent,
    AddGrupollamadoComponent,
    LisGrupollamadoComponent,
    AddItemgrupoComponent,
    LisItemgrupoComponent,
    AddClaseComponent,
    LisClaseComponent,
    UploadLibreriaComponent,
    JsonParametrosComponent,
    LisEjedetalleComponent,
    VerEjedetalleComponent,
    TokenSessionComponent,
    LisEquivalenciaComponent,
    AddEquivalenciaComponent,
    AddDetalleeqComponent,
    TablaParametroComponent,
    XlsParametroComponent,
    UploadParametroComponent,
    AddCompuestoComponent,
    XlsEquivalenciaComponent,
    LisSubParametroComponent,
    AddSubParametroComponent,
    LisParametroArrayComponent,
    AddParametroArrayComponent,
    AddIpvalidaComponent,
    LisIpvalidaComponent,
    LisAplicacionIpComponent

  ],
  imports: [

    CommonModule,
    AplicacionRoutingModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    DataTablesModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    NgxJsonViewerModule,
    FormsModule
  ], providers: [
    BsModalRef

  ], exports: [
    VentanaModalComponent
  ]
})
export class AplicacionModule { }
