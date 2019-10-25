export const environment = {
    production: false,
    grupo:'integradorRestWs-pruebas',
    baseUrl: 'https://test.ciadti.co:9024/integrador-rest/servicios/'  ,
    configuracionMsal :{
      clientID: 'ff27df78-09ee-4f0a-9dea-ccb5b21abe81',
      authority: "https://login.microsoftonline.com/2fe9a652-eedf-4168-9370-18a597068a8e/",
      validateAuthority: true,
      redirectUri: "https://test.ciadti.co:9024/integrador-web/load",
      cacheLocation: "sessionStorage",
      postLogoutRedirectUri: "https://test.ciadti.co:9024/integrador-web",
      navigateToLoginRequestUrl: false,
      popUp: false,
      consentScopes: [
      ],
      correlationId: '1234',
      piiLoggingEnabled: true,
      unprotectedResources: ["https://test.ciadti.co:9024/integrador-rest/servicios/"]
    },
    optiosMsal:[
    ]
  };