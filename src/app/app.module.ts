import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
//import { RegisterComponent } from './views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DataTablesModule } from 'angular-datatables';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,

} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';


import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MsalModule } from "@azure/msal-angular";
import { MsalInterceptor } from "@azure/msal-angular";
import { LogLevel } from "msal";
import { environment } from '../environments/environment';
import { RestUserAuthService } from './aplicacion/servicio/rest-user-auth.service';
import { LoaderComponent } from './aplicacion/componente/utilidad/loader/loader.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


export function loggerCallback(logLevel, message, piiEnabled) {
  //console.log("client logging" + message);
}

export const protectedResourceMap: [string, string[]][] =
  [
    ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
    ['https://graph.microsoft.com/v1.0/users', ['User.Read']],
    //['https://graph.microsoft.com/v1.0/me/photo', ['User.ReadBasic.All']],
     ['https://graph.microsoft.com/v1.0/me/memberOf', ['Group.Read.All']],
     ['https://graph.microsoft.com/v1.0/groups/',['Group.ReadWrite.All', 'Directory.ReadWrite.All','User.Read','Directory.AccessAsUser.All'] ],
    //['https://graph.microsoft.com/v1.0',['api://ff27df78-09ee-4f0a-9dea-ccb5b21abe81/access_as_user/1']]
  ];

  


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModule.forRoot(),

    MsalModule.forRoot({
      clientID: environment.configuracionMsal.clientID,
      authority: environment.configuracionMsal.authority,
      validateAuthority: environment.configuracionMsal.validateAuthority,
      redirectUri: environment.configuracionMsal.redirectUri,
      cacheLocation: environment.configuracionMsal.cacheLocation,
      postLogoutRedirectUri: environment.configuracionMsal.postLogoutRedirectUri,
      navigateToLoginRequestUrl: environment.configuracionMsal.navigateToLoginRequestUrl,
      popUp: environment.configuracionMsal.popUp,
      consentScopes: environment.configuracionMsal.consentScopes,
      correlationId: environment.configuracionMsal.correlationId,
      piiLoggingEnabled: environment.configuracionMsal.piiLoggingEnabled,
      unprotectedResources: environment.configuracionMsal.unprotectedResources,
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      level: LogLevel.Info
    }),


  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    LoaderComponent,

    //VentanaModalComponent
    //RegisterComponent
  ],
  providers: [
    //{    provide: LocationStrategy,    useClass: HashLocationStrategy},
    BsModalRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor, multi: true
    },
    RestUserAuthService

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
