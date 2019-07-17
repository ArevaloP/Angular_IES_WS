import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusComponent } from './status/status.component'
import { ServiciowebComponent } from './componente/servicioweb/servicioweb.component';
import { UsuariowsComponent } from './componente/usuariows/usuariows.component';
import { LisAppExternaComponent } from './componente/aplicacionext/lis-app-externa/lis-app-externa.component';
import { AddAppExternaComponent } from './componente/aplicacionext/add-app-externa/add-app-externa.component';


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
        component: ServiciowebComponent,
        data: {
          title: 'Servicio Web'
        }
      }
      ,

      {
        path: 'usuarioWs',
        component: UsuariowsComponent,
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
export class AplicacionRoutingModule {}
