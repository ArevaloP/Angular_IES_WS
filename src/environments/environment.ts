// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {

  production: false,
  grupo: 'integrador-restws-desarrollo2',
  // baseUrl: 'http://172.26.3.3:8080/integrador-rest/servicios/',
  baseUrl: 'http://localhost:9019/integrador-rest/servicios/',
  //baseUrl: 'https://development.ciadti.co:8090/integrador-rest/servicios/'  ,
  configuracionMsal: {
    clientID: '43dd2409-486c-4565-a840-407a7d0dfba7',
    authority: "https://login.microsoftonline.com/2fe9a652-eedf-4168-9370-18a597068a8e/",
    validateAuthority: true,
    redirectUri: "http://localhost:4200/integrador-web/load",
    cacheLocation: "sessionStorage",
    postLogoutRedirectUri: "http://localhost:4200",
    navigateToLoginRequestUrl: false,
    popUp: false,
    consentScopes: [
      //"api://ff27df78-09ee-4f0a-9dea-ccb5b21abe81/access_as_user/1",
    ],
    correlationId: '1234',
    piiLoggingEnabled: true,
    //unprotectedResources: ["https://development.ciadti.co:8090/integrador-rest/servicios/"]
    unprotectedResources: ["http://localhost:9019/integrador-rest/servicios/"]
    // unprotectedResources: ["http://172.26.3.3:8080/integrador-rest/servicios/"]
  },
  optiosMsal: [
  ]

};
