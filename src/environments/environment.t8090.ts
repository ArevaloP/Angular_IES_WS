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

};
