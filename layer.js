RouterLayer = {};

RouterLayer.router = null;

if (_.has(Package, 'iron:router')) {
  RouterLayer.router = 'iron-router';
}

if (_.has(Package, 'kadira:flow-router')) {
  RouterLayer.router = 'flow-router';
}

RouterLayer.route = function(url, options) {
  if (!RouterLayer.router) {
    throw new Meteor.Error('router-layer', 'No router is configured');
  }

  check(url, String);
  check(options, {
    template: String,
    layout: Match.Optional(String),
    name: Match.Optional(String)
  });

  return this._route(url, options);
};

RouterLayer.pathFor = function(routeName, params) {
  if (!RouterLayer.router) {
    throw new Meteor.Error('router-layer', 'No router is configured');
  }

  check(routeName, String);
  check(params, Match.Optional(Object));

  return this._pathFor(routeName, params);
}

RouterLayer.isActiveRoute = function(routeName) {
  if (!RouterLayer.router) {
    throw new Meteor.Error('router-layer', 'No router is configured');
  }
}

RouterLayer.isActivePath = function(path) {
  if (!RouterLayer.router) {
    throw new Meteor.Error('router-layer', 'No router is configured');
  }
}
