'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  // add mdl (css only)
  app.import(
    'node_modules/material-design-lite/dist/material.blue_grey-red.min.css',
  );

  return app.toTree();
};
