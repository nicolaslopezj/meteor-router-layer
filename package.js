Package.describe({
  name: 'nicolaslopezj:router-layer',
  summary: 'A layer for Meteor Routers',
  version: '0.0.11',
  git: 'https://github.com/nicolaslopezj/meteor-router-layer'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['meteor-platform', 'underscore']);

  api.use(['iron:router@1.0.9', 'kadira:flow-router@2.1.1', 'ostrio:flow-router-extra@3.3.0', 'kadira:blaze-layout@2.0.0', 'nicolaslopezj:reactive-templates@1.2.1'], { weak: true });

  api.addFiles([
    'layer.js',
    'iron-router.js',
    'flow-router.js'
  ]);

  api.addFiles([
    'layer.html',
    'layer_client.js'
  ], 'client');

  api.export('RouterLayer');
});

Package.onTest(function(api) {
  api.use('tinytest');
});
