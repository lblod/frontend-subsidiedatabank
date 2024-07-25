'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    '@appuniversum/ember-appuniversum': {
      dutchDatePickerLocalization: true,
      disableWormholeElement: true,
    },
    'ember-test-selectors': {
      strip: false,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
  });

  return app.toTree();
};
