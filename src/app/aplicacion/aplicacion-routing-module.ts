import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusComponent } from './status/status.component'
import { LisAppExternaComponent } from './componente/aplicacionext/lis-app-externa/lis-app-externa.component';
import { AddAppExternaComponent } from './componente/aplicacionext/add-app-externa/add-app-externa.component';
import { LisServicioWebComponent } from './componente/servicioweb/lis-servicio-web/lis-servicio-web.component';
import { LisUsuariowsComponent } from './componente/usuariows/lis-usuariows/lis-usuariows.component';
import { AddUsuariowsComponent } from './componente/usuariows/add-usuariows/add-usuariows.component';
import { AddServicioWebComponent } from './componente/servicioweb/add-servicio-web/add-servicio-web.component';
import { LisJdbcConexionComponent } from './componente/jdbcconexion/lis-jdbc-conexion/lis-jdbc-conexion.component';
import { AddJdbcConexionComponent } from './componente/jdbcconexion/add-jdbc-conexion/add-jdbc-conexion.component';



const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Aplicacion'
    },

    children: [
      {
        path: 'status',
        component: StatusComponent,
        data: {
          title: 'status'
        }
      },

      {
        path: 'lis-appexterna',
        component: LisAppExternaComponent,
        data: {
          title: 'Aplicacion Externa'
        }
      },

      {
        path: 'add-appexterna',
        component: AddAppExternaComponent,
        data: {
          title: 'Aplicacion Externa'
        }
      },



      {
        path: 'servicioWeb',
        component: LisServicioWebComponent,
        data: {
          title: 'Servicio Web'
        }
      },

      {
        path: 'add-servicioweb',
        component: AddServicioWebComponent,
        data: {
          title: 'Servicio Web'
        }
      },

      {
        path: 'jdbc-conexion',
        component: LisJdbcConexionComponent,
        data: {
          title: 'Servicio Web'
        }
      },
      {
        path: 'add-conexionjdbc',
        component: AddJdbcConexionComponent,
        data: {
          title: 'Servicio Web'
        }
      },

      {
        path: 'usuarioWs',
        component: LisUsuariowsComponent,
        data: {
          title: 'Usuario Ws'
        }
      },

      {
        path: 'add-usuariows',
        component: AddUsuariowsComponent,
        data: {
          title: 'Usuario Ws'
        }
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionRoutingModule { }
