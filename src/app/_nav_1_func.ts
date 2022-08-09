interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}




export const navItems: NavData[] = [

/*
  {
    title: true,
    name: 'Configuración'
  },
  {
    name: 'Aplicaciones',
    url: '/aplicacion/lis-appexterna',
    icon: 'fa fa-television'
  },
  {
    name: 'Servicios web',
    url: '/aplicacion/servicio/servicioWeb',
    icon: 'fa fa-cogs'
  },
  {
    name: 'Privilegios',
    url: '/aplicacion/privilegio/usuarioWs',
    icon: 'fa fa-user-plus'
  },

*/

  {
    title: true,
    name: 'Recursos'
  },
/*
  {
    name: 'Conexiones',
    url: '/aplicacion/conexion/jdbc-conexion',
    icon: 'fa fa-external-link'
  },

  {
    name: 'Clases Java',
    url: '/aplicacion/interfaz/lis-clase',
    icon: 'fa fa-code'
  },*/

  {
    name: 'Equivalencias',
    url: '/aplicacion/equivalencia/lis-equivalencia',
    icon: 'fa fa-random'
  },
/*
  {
    name: 'Parámetros[ ]',
    url: '/aplicacion/parametros-array/lis-parametro-array',
    icon: 'fa fa-bars'
  },

  {
    name: 'Ip válida',
    url: '/aplicacion/ip-valida/lis-ip-valida',
    icon: 'fa fa-bars'
  },

  {
    title: true,
    name: 'Integración',
    icon: 'fa fa-users'
  },
  */

 /*{
    name: 'Grupo Servicio',
    url: '/aplicacion/grupollamado/lis-grupollamado',
    icon: 'fa fa-users'
  },*/

  /*
  {
    name: 'Ejecuciones',
    url: '/aplicacion/detalle/lis-ejecucionws',
    icon: 'fa fa-list-ol'
  },
*/

];
