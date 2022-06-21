import { IonicAuthOptions } from '@ionic-enterprise/auth';

const auth0Config: IonicAuthOptions = {
  // audience value is required for auth0's config. If it doesn't exist, the jwt payload will be empty
  audience: 'https://io.ionic.demo.ac',
  authConfig: 'auth0' as 'auth0',
  clientID: 'yLasZNUGkZ19DGEjTmAITBfGXzqbvd00',
  discoveryUrl: 'https://dev-2uspt-sz.us.auth0.com/.well-known/openid-configuration',
  logoutUrl: '',
  scope: 'openid email picture profile',
  logLevel: 'DEBUG',
};

export const mobileAuth0Config: IonicAuthOptions = {
  ...auth0Config,
  redirectUri: 'msauth://login',
  logoutUrl: 'msauth://login',
  platform: 'capacitor',
  iosWebView: 'private',
};

export const webAuth0Config: IonicAuthOptions = {
  ...auth0Config,
  redirectUri: 'http://localhost:8100/login',
  logoutUrl: 'http://localhost:8100/login',
  platform: 'web',
};

const awsConfig = {
  authConfig: 'cognito' as 'cognito',
  clientID: '4geagm2idmq87fii15dq9toild',
  discoveryUrl: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_YU8VQe29z/.well-known/openid-configuration',
  clientSecret: '124dch1p6824ppuef8o71unk14d4pt3p5hnntofvu21i2m960r1g',
  scope: 'openid email profile',
  audience: '',
};

export const mobileAWSConfig: IonicAuthOptions = {
  ...awsConfig,
  redirectUri: 'msauth://login',
  logoutUrl: 'msauth://login',
  platform: 'capacitor',
  iosWebView: 'private',
};

export const webAWSConfig: IonicAuthOptions = {
  ...awsConfig,
  redirectUri: 'http://localhost:8100/login',
  logoutUrl: 'http://localhost:8100/login',
  platform: 'web',
};

const azureConfig = {
  authConfig: 'azure' as 'azure',
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  scope: 'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  audience: 'https://api.myapp.com',
};

export const mobileAzureConfig: IonicAuthOptions = {
  ...azureConfig,
  redirectUri: 'myapp://callback',
  logoutUrl: 'myapp://callback?logout=true',
  platform: 'capacitor',
  iosWebView: 'private',
};

export const webAzureConfig: IonicAuthOptions = {
  ...azureConfig,
  redirectUri: 'http://localhost:8100/login',
  logoutUrl: 'http://localhost:8100/login',
  platform: 'web',
};

export const environment = {
  production: false,
  dataService: 'https://cs-demo-api.herokuapp.com',
};
