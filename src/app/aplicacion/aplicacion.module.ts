import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { AplicacionRoutingModule } from './aplicacion-routing-module';
import { UsuariowsComponent } from './componente/usuariows/usuariows.component';
import { ServiciowebComponent } from './componente/servicioweb/servicioweb.component';
import { LisAppExternaComponent } from './componente/aplicacionext/lis-app-externa/lis-app-externa.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AddAppExternaComponent } from './componente/aplicacionext/add-app-externa/add-app-externa.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LisAplicacionUsuarioComponent } from './componente/aplicacionext/lis-aplicacion-usuario/lis-aplicacion-usuario.component';
import { LisAplicacionServicioComponent } from './componente/aplicacionext/lis-aplicacion-servicio/lis-aplicacion-servicio.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    StatusComponent,
    UsuariowsComponent,
    ServiciowebComponent,
    LisAppExternaComponent,
    AddAppExternaComponent,
    LisAplicacionUsuarioComponent,
    LisAplicacionServicioComponent,
    ServiciowebComponent
    
  ],
  imports: [
    CommonModule,
    AplicacionRoutingModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    DataTablesModule
  ]
})
export class AplicacionModule { }
