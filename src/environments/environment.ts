// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //baseUrl: 'http://localhost:8080/contexto/'  ,
  baseUrl: 'https://development.ciadti.co:8090/contexto/' , 
  configuracionMsal :{
    clientID: 'ff27df78-09ee-4f0a-9dea-ccb5b21abe81',
    authority: "https://login.microsoftonline.com/2fe9a652-eedf-4168-9370-18a597068a8e/",
    validateAuthority: true,
    redirectUri: "http://localhost:4200/load",
    cacheLocation: "sessionStorage",
    postLogoutRedirectUri: "http://localhost:4200/",
    navigateToLoginRequestUrl: false,
    popUp: false,
    consentScopes: [
      "user.read","api://ff27df78-09ee-4f0a-9dea-ccb5b21abe81/access_as_user/1"
    ],
    correlationId: '1234',
    piiLoggingEnabled: true,
    unprotectedResources: ["https://www.microsoft.com/en-us/"],

  },
  optiosMsal:[
    "user.read",
    "api://ff27df78-09ee-4f0a-9dea-ccb5b21abe81/access_as_user/1",
    "User.ReadBasic.All",
    "Group.Read.All",
    "Directory.AccessAsUser.All"
  ],
  group:"2141f301-82c8-4382-8459-2c8ac6bf1766"



};
