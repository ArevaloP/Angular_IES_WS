export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/contexto/servicios/'  ,
  //baseUrl: 'https://development.ciadti.co:8090/contexto/' , 
  configuracionMsal :{
    clientID: 'ff27df78-09ee-4f0a-9dea-ccb5b21abe81',
    authority: "https://login.microsoftonline.com/2fe9a652-eedf-4168-9370-18a597068a8e/",
    validateAuthority: true,
    //redirectUri: "http://localhost:4200/load",
    cacheLocation: "sessionStorage",
    postLogoutRedirectUri: "http://localhost:4200/",
    navigateToLoginRequestUrl: false,
    popUp: false,
    consentScopes: [

    ],
    correlationId: '1234',
    piiLoggingEnabled: true,
    unprotectedResources: ["https://www.microsoft.com/en-us/"],

  },
  optiosMsal:[


  ]




};
