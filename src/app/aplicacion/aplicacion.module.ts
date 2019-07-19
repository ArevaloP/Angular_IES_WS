import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { AplicacionRoutingModule } from './aplicacion-routing-module';
import { LisAppExternaComponent } from './componente/aplicacionext/lis-app-externa/lis-app-externa.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AddAppExternaComponent } from './componente/aplicacionext/add-app-externa/add-app-externa.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LisAplicacionUsuarioComponent } from './componente/aplicacionext/lis-aplicacion-usuario/lis-aplicacion-usuario.component';
import { LisAplicacionServicioComponent } from './componente/aplicacionext/lis-aplicacion-servicio/lis-aplicacion-servicio.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DataTablesModule } from 'angular-datatables';
import { LisServicioWebComponent } from './componente/servicioweb/lis-servicio-web/lis-servicio-web.component';
import { AddServicioWebComponent } from './componente/servicioweb/add-servicio-web/add-servicio-web.component';
import { AddUsuariowsComponent } from './componente/usuariows/add-usuariows/add-usuariows.component';
import { LisUsuariowsComponent } from './componente/usuariows/lis-usuariows/lis-usuariows.component';
import { JdbcConexionComponent } from './componente/servicioweb/jdbc-conexion/jdbc-conexion.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule ,BsModalRef} from 'ngx-bootstrap/modal';
import { VentanaModalComponent } from './componente/utilidad/ventana-modal/ventana-modal.component';



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
    JdbcConexionComponent,
    VentanaModalComponent
    
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
    ModalModule.forRoot()
  ],providers: [
    BsModalRef

  ]
})
export class AplicacionModule { }
