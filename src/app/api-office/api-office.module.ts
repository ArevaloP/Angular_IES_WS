import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeGrupoComponent } from './componente/office-grupo/office-grupo.component';
import { ApiOfficeRoutingModule } from './api-office-routing';
import { DataTablesModule } from 'angular-datatables';
import { AplicacionModule } from '../aplicacion/aplicacion.module';




@NgModule({
  declarations: [
    OfficeGrupoComponent,
    
    
  ],
  imports: [
    CommonModule,
    ApiOfficeRoutingModule,
    DataTablesModule,
    AplicacionModule
  ] 
})
export class ApiOfficeModule { }
