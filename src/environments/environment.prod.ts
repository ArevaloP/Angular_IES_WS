// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
/*
export const environment = {
  production: true,
  grupo:'integrador-panamericana',
  baseUrl: 'https://siafpruebas.unipanamericana.edu.co:8190/integrador-rest/servicios/'  ,
  configuracionMsal :{
    clientID: '986be348-7575-496d-8485-cf7971c3660d',
    authority: "https://login.microsoftonline.com/4bf38ea2-832d-4552-b508-421570da43ff/",
    validateAuthority: true,
    redirectUri: "https://siafpruebas.unipanamericana.edu.co:8190/integrador-web/load",
    cacheLocation: "sessionStorage",
    postLogoutRedirectUri: "https://siafpruebas.unipanamericana.edu.co:8190/integrador-web",
    navigateToLoginRequestUrl: false,
    popUp: false,
    consentScopes: [
    ],
    correlationId: '1234',
    piiLoggingEnabled: true,
    unprotectedResources: ["https://siafpruebas.unipanamericana.edu.co:8190/integrador-rest/servicios/"]
  },
  optiosMsal:[
  ]
};*/

export const environment = {
    production: false,
    grupo:'integradorRestWs-pruebas',
    baseUrl: 'https://test.ciadti.co:9024/integrador-rest/servicios/'  ,
    // baseUrl: 'http://localhost:9019/integrador-rest/servicios/',
    configuracionMsal :{
      clientID: 'ff27df78-09ee-4f0a-9dea-ccb5b21abe81',
      authority: "https://login.microsoftonline.com/2fe9a652-eedf-4168-9370-18a597068a8e/",
      validateAuthority: true,
      redirectUri: "https://test.ciadti.co:9024/integrador-web/load",
      // redirectUri: "http://localhost:9019/integrador-web/load",
      cacheLocation: "sessionStorage",
      postLogoutRedirectUri: "https://test.ciadti.co:9024/integrador-web",
      // postLogoutRedirectUri: "http://localhost:9019/integrador-web",
      navigateToLoginRequestUrl: false,
      popUp: false,
      consentScopes: [
      ],
      correlationId: '1234',
      piiLoggingEnabled: true,
      unprotectedResources: ["https://test.ciadti.co:9024/integrador-rest/servicios/"]
      // unprotectedResources: ["http://localhost:9019/integrador-rest/servicios/"]
    },
    optiosMsal:[
    ]
  };
/*
export const environment = {

  production: false,
  grupo: 'integrador-restws-desarrollo2',
  //baseUrl: 'https://development.ciadti.co:8090/integrador-rest/servicios/',
  baseUrl: 'https://development.ciadti.co:8090/integrador-rest/servicios/',
  configuracionMsal: {
    clientID: '43dd2409-486c-4565-a840-407a7d0dfba7',
    authority: "https://login.microsoftonline.com/2fe9a652-eedf-4168-9370-18a597068a8e/",
    validateAuthority: true,
    redirectUri: "https://development.ciadti.co:8090/integrador-web/load",
    cacheLocation: "sessionStorage",
    postLogoutRedirectUri: "https://development.ciadti.co:8090",
    navigateToLoginRequestUrl: false,
    popUp: false,
    consentScopes: [
      //"api://ff27df78-09ee-4f0a-9dea-ccb5b21abe81/access_as_user/1",
    ],
    correlationId: '1234',
    piiLoggingEnabled: true,
    unprotectedResources: ["https://development.ciadti.co:8090/integrador-rest/servicios/"]
  },
  optiosMsal: [
  ]

};*/
