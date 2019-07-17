import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { AplicacionRoutingModule } from './aplicacion-routing-module';
import { UsuariowsComponent } from './componente/usuariows/usuariows.component';
import { ServiciowebComponent } from './componente/servicioweb/servicioweb.component';
import { LisAppExternaComponent } from './componente/aplicacionext/lis-app-externa/lis-app-externa.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AddAppExternaComponent } from './componente/aplicacionext/add-app-externa/add-app-externa.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    StatusComponent,
    UsuariowsComponent,
    ServiciowebComponent,
    LisAppExternaComponent,
    AddAppExternaComponent
    
  ],
  imports: [
    CommonModule,
    AplicacionRoutingModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AplicacionModule { }
