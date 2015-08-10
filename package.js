Package.describe({
  name: 'nicolaslopezj:router-layer',
  summary: 'A layer for Meteor Routers',
  version: '0.0.1',
  git: 'https://github.com/nicolaslopezj/meteor-router-layer'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['meteor-platform', 'underscore']);

  api.use(['iron:router', 'kadira:flow-router', 'kadira:blaze-layout'], { weak: true });

  api.addFiles([
    'layer.js',
    'iron-router.js',
    'flow-router.js'
  ]);

  api.addFiles([
    'layer_client.js'
  ], 'client');

  api.export('RouterLayer');
});

Package.onTest(function(api) {
  api.use('tinytest');
});
