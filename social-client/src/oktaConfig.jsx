import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: `https://${import.meta.env.VITE_OKTA_DOMAIN}/oauth2/default`,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: `http://localhost:8000/google/callback`,
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  responseType: 'code',
  pkce: false
});

export default oktaAuth;
