Package.describe({
  name: 'nicolaslopezj:router-layer',
  summary: 'A layer for Meteor Routers',
  version: '0.0.0',
  git: 'https://github.com/nicolaslopezj/meteor-router-layer'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    ]);

  api.addFiles();
});

Package.onTest(function(api) {
  api.use('tinytest');
});
