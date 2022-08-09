import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusComponent } from './componente/status/status.component'
import { LisAppExternaComponent } from './componente/aplicacionext/lis-app-externa/lis-app-externa.component';
import { AddAppExternaComponent } from './componente/aplicacionext/add-app-externa/add-app-externa.component';
import { LisServicioWebComponent } from './componente/servicioweb/lis-servicio-web/lis-servicio-web.component';
import { LisUsuariowsComponent } from './componente/usuariows/lis-usuariows/lis-usuariows.component';
import { AddUsuariowsComponent } from './componente/usuariows/add-usuariows/add-usuariows.component';
import { AddServicioWebComponent } from './componente/servicioweb/add-servicio-web/add-servicio-web.component';
import { LisJdbcConexionComponent } from './componente/jdbcconexion/lis-jdbc-conexion/lis-jdbc-conexion.component';
import { AddJdbcConexionComponent } from './componente/jdbcconexion/add-jdbc-conexion/add-jdbc-conexion.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoaderComponent } from './componente/utilidad/loader/loader.component';
import { LisParametroComponent } from './componente/servicioweb/lis-parametro/lis-parametro.component';
import { AddParametroComponent } from './componente/servicioweb/add-parametro/add-parametro.component';
import { GrupoLlamado } from './modelo/grupo-llamado';
import { LisGrupollamadoComponent } from './componente/grupollamado/lis-grupollamado/lis-grupollamado.component';
import { LisClaseComponent } from './componente/implementacion/lis-clase/lis-clase.component';
import { AddClaseComponent } from './componente/implementacion/add-clase/add-clase.component';
import { AddGrupollamadoComponent } from './componente/grupollamado/add-grupollamado/add-grupollamado.component';
import { LisEjedetalleComponent } from './componente/detalle-ejecucion/lis-ejedetalle/lis-ejedetalle.component';
import { VerEjedetalleComponent } from './componente/detalle-ejecucion/ver-ejedetalle/ver-ejedetalle.component';
import { LisEquivalenciaComponent } from './componente/equivalencia/lis-equivalencia/lis-equivalencia.component';
import { AddEquivalenciaComponent } from './componente/equivalencia/add-equivalencia/add-equivalencia.component';
import { TablaParametroComponent } from './componente/servicioweb/tabla-parametro/tabla-parametro.component';
import { XlsParametroComponent } from './componente/servicioweb/xls-parametro/xls-parametro.component';
import { XlsEquivalenciaComponent } from './componente/equivalencia/xls-equivalencia/xls-equivalencia.component';
import { LisSubParametroComponent } from './componente/lista-parametro/lis-sub-parametro/lis-sub-parametro.component';
import { AddSubParametroComponent } from './componente/lista-parametro/add-sub-parametro/add-sub-parametro.component';
import { LisParametroArrayComponent } from './componente/parametros-array/lis-parametro-array/lis-parametro-array.component';
import { AddParametroArrayComponent } from './componente/parametros-array/add-parametro-array/add-parametro-array.component';
import { AddIpvalidaComponent } from './componente/ipvalida/add-ipvalida/add-ipvalida.component';
import { LisIpvalidaComponent } from './componente/ipvalida/lis-ipvalida/lis-ipvalida.component';




const routes: Routes = [

  {

    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Aplicación'
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
          title: 'Listar aplicación externa'
        }
      },

      {
        path: 'add-appexterna',
        component: AddAppExternaComponent,
        data: {
          title: 'Gestionar aplicación externa'
        }
      },

    ]
  },

  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Servicios web'
    }, children: [

      {
        path: 'servicioWeb',
        component: LisServicioWebComponent,
        data: {
          title: 'Listar servicios web'
        }
      },

      {
        path: 'add-servicioweb',
        component: AddServicioWebComponent,
        data: {
          title: 'Gestionar servicios web'
        }
      }




    ]
  },

  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Gestión de datos'
    }, children: [

      {
        path: 'lis-parametro',
        component: LisParametroComponent,
        data: {
          title: 'Listar parametros'
        }
      },

      {
        path: 'add-parametro',
        component: AddParametroComponent,
        data: {
          title: 'Gestionar parametros'
        }
      },
      {
        path: 'add-parametro-tabla',
        component: TablaParametroComponent,
        data: {
          title: 'Gestionar parametros'
        }
      },
      {
        path: 'xls-parametro',
        component: XlsParametroComponent,
        data: {
          title: 'Gestionar parametros'
        }
      },

    ]

  },

  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Gestión de array de parametros'
    },
    children: [
      {
        path: 'lis-sub-parametro',
        component: LisSubParametroComponent,
        data: {
          title: 'Listar array de parametros'
        }
      },
      {
        path: 'lis-sub-parametro/:modificado',
        component: LisSubParametroComponent,
        data: {
          title: 'Listar array de parametros'
        }
      },
      {
        path: 'add-sub-parametro',
        component: AddSubParametroComponent,
        data: {
          title: 'Gestionar array de parametro'
        }
      }
    ]
  },


  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Privilegios'
    }, children: [
      {
        path: 'usuarioWs',
        component: LisUsuariowsComponent,
        data: {
          title: 'Listar privilegios'
        }
      },

      {
        path: 'add-usuariows',
        component: AddUsuariowsComponent,
        data: {
          title: 'Gestionar privilegios'
        }
      },
    ]
  },


  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Conexiones'
    }, children: [

      {
        path: 'jdbc-conexion',
        component: LisJdbcConexionComponent,
        data: {
          title: 'Listar conexiones Jdbc'
        }
      },
      {
        path: 'add-conexionjdbc',
        component: AddJdbcConexionComponent,
        data: {
          title: 'Gestionar Conexiones Jdbc'
        }
      }]
  },

  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Clases Java'
    }, children: [

      {
        path: 'lis-clase',
        component: LisClaseComponent,
        data: {
          title: 'Listar clases Java'
        }
      },

      {
        path: 'add-clase',
        component: AddClaseComponent,
        data: {
          title: 'Gestionar clase Java'
        }
      }
    ]
  },
  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Equivalencia de entidades'
    }, children: [

      {
        path: 'lis-equivalencia',
        component: LisEquivalenciaComponent,
        data: {
          title: 'Listar equivalencia de entidad'
        }
      },

      {
        path: 'add-equivalencia',
        component: AddEquivalenciaComponent,
        data: {
          title: 'Agregar equivalencia de entidad'
        }
      },

      {
        path: 'xls-equivalencia',
        component: XlsEquivalenciaComponent,
        data: {
          title: 'Agregar equivalencia de entidad'
        }
      }
    ]
  },

  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Parámetros tipo array'
    }, children: [

      {
        path: 'lis-parametro-array',
        component: LisParametroArrayComponent,
        data: {
          title: 'Listar parámetros tipo array'
        }
      },

      {
        path: 'add-parametro-array',
        component: AddParametroArrayComponent,
        data: {
          title: 'Agregar parámetro tipo array'
        }
      }
    ]
  },


  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Ips Validas'
    }, children: [

      {
        path: 'lis-ip-valida',
        component: LisIpvalidaComponent,
        data: {
          title: 'Listar ip validas'
        }
      },

      {
        path: 'add-ip-valida',
        component: AddIpvalidaComponent,
        data: {
          title: 'Agregar ip valida'
        }
      }
    ]
  },




  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Grupo LLamado'
    }, children: [
      {
        path: 'lis-grupollamado',
        component: LisGrupollamadoComponent,
        data: {
          title: 'Grupo LLamado'
        }
      },

      {
        path: 'add-grupollamado',
        component: AddGrupollamadoComponent,
        data: {
          title: 'Grupo LLamado'
        }
      }



    ]
  },



  {
    path: '',
    canActivate: [MsalGuard],
    data: {
      title: 'Ejecución Servicio'
    }, children: [
      {
        path: 'lis-ejecucionws',
        component: LisEjedetalleComponent,
        data: {
          title: 'Listar ejecución de servicio'
        }
      }, {
        path: 'ver-ejecucionws',
        component: VerEjedetalleComponent,
        data: {
          title: 'Ver ejecución de servicio'
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
