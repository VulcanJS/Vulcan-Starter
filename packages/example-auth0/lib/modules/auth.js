/*

Adapted from

https://github.com/auth0-samples/auth0-react-samples/blob/embedded-login/01-Embedded-Login/src/Auth/Auth.js

*/

import Auth0Lock from 'auth0-lock';
// import { AUTH_CONFIG } from './auth0-variables';
// import history from '../history';
import { getSetting } from 'meteor/vulcan:core';
import Promise from 'bluebird';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AUTH_CONFIG = {
  clientId: getSetting('auth0.clientId'),
  domain: getSetting('auth0.domain'),
}

export default class Auth {

  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      params: {
        scope: 'openid email profile'
      }
    }
  });

  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession);
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (err) => {
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
      // history.replace('/home');
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);

      cookies.set('access_token', authResult.accessToken, { path: '/', expires: new Date(expiresAt)});

      // navigate to the home route
      // history.replace('/home');
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    // history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  async getUserInfo() {

    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const basicInfo = {
        accessToken,
        idToken: localStorage.getItem('id_token'),
        expiresAt: localStorage.getItem('expires_at'),
      };

      const lockAsync = Promise.promisifyAll(this.lock);
      const extraInfo = await lockAsync.getUserInfoAsync(basicInfo.accessToken);

      return {
        ...basicInfo,
        ...extraInfo
      }
    } else {
      return {};
    }
  }
}
