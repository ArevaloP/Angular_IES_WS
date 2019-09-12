import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoaderComponent } from './aplicacion/componente/utilidad/loader/loader.component';
import { TokenSessionComponent } from './aplicacion/componente/utilidad/token-session/token-session.component';
import { AuthGuard } from './aplicacion/modelo/auth-guard';
//import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'load',
    component: LoaderComponent,
    //canActivate: [MsalGuard]
  },
  /*{
    path: 'id_token',
    component: TokenSessionComponent,
    canActivate:[MsalGuard]
    //redirectTo: 'load',
    //pathMatch: "full",
    //canActivate: [MsalGuard]
  },*/

  {
    path: 'aplicacion',
    //canActivate: [MsalGuard],
    redirectTo: 'aplicacion/lis-appexterna',
    pathMatch: "full",
    data: {
      title: 'Aplicaciones'
    }
  },


  {
    path: 'aplicacion/servicio',
    //canActivate: [MsalGuard],
    redirectTo: 'aplicacion/servicio/servicioWeb',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    }
  },


  {
    path: 'aplicacion/privilegio',
    canActivate: [MsalGuard],
    redirectTo: 'aplicacion/privilegio/usuarioWs',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    }
  },


  {
    path: 'aplicacion/conexion',
    canActivate: [MsalGuard],
    redirectTo: 'aplicacion/conexion/jdbc-conexion',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    }
  },


  {
    path: 'aplicacion/interfaz',
    canActivate: [MsalGuard],
    redirectTo: 'aplicacion/interfaz/lis-clase',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    }
  },

  {
    path: 'aplicacion/equivalencia',
    canActivate: [MsalGuard],
    redirectTo: 'aplicacion/equivalencia/lis-equivalencia',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    }
  },

  {
    path: 'aplicacion/grupollamado',
    canActivate: [MsalGuard],
    redirectTo: 'aplicacion/grupollamado/lis-grupollamado',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    },
    
  },

  {
    path: 'aplicacion/detalle',
    canActivate: [MsalGuard],
    redirectTo: 'aplicacion/detalle/lis-ejecucionws',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    },
    
  },

  {
    path: 'api-office',
    canActivate: [MsalGuard],
    redirectTo: 'api-office/grupo',
    pathMatch: "full",
    data: {
      title: 'Aplicación'
    }
  },


  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [

      {
        path: 'dashboard',
        canActivate: [MsalGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'aplicacion',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },
      {
        path: 'aplicacion/servicio',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },
      {
        path: 'aplicacion/privilegio',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },
      {
        path: 'aplicacion/conexion',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },

      {
        path: 'aplicacion/interfaz',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },
      {
        path: 'aplicacion/equivalencia',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },

      {
        path: 'aplicacion/grupollamado',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },
      {
        path: 'aplicacion/detalle',
        canActivate: [MsalGuard],
        loadChildren: () => import('./aplicacion/aplicacion.module').then(m => m.AplicacionModule)
      },
      {
        path: 'api-office',
        canActivate: [MsalGuard],
        loadChildren: () => import('./api-office/api-office.module').then(m => m.ApiOfficeModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
