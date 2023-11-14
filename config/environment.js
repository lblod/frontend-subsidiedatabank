'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'frontend-subsidiedatabank',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    // Feature flags for the application to enable/disable certain features
    featureFlags: {
      detailView: false,
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    acmidm: {
      clientId: '{{ACMIDM_CLIENT_ID}}',
      scope: '{{ACMIDM_SCOPE}}',
      authUrl: '{{ACMIDM_AUTH_URL}}',
      logoutUrl: '{{ACMIDM_LOGOUT_URL}}',
      authRedirectUrl: '{{ACMIDM_AUTH_REDIRECT_URL}}',
      switchRedirectUrl: '{{ACMIDM_SWITCH_REDIRECT_URL}}',
    },
  };

  if (environment === 'development') {
    ENV.featureFlags['detailView'] = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
  }

  return ENV;
};
