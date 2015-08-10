/**
 * Namespace for Router Layer
 */
RouterLayer = {};

/**
 * The router package name
 * @type {String}
 */
RouterLayer.router = null;

/**
 * Check if uses iron router
 */
if (_.has(Package, 'iron:router')) {
  RouterLayer.router = 'iron-router';
}

/**
 * Check if uses flow router
 */
if (_.has(Package, 'kadira:flow-router')) {
  RouterLayer.router = 'flow-router';
}

/**
 * Creates a new route
 * @param {String} url              The path of the route
 * @param {Object} [options]
 * @param {String} options.template The template for this route
 * @param {String} options.layout   Optional. The layout for this route
 * @param {String} options.name     Optional. The name of the route
 */
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

/**
 * Returns the path for a route
 * @param  {String} routeName The name of the route
 * @param  {Object} params    Parameters for the route
 * @return {String}           The requested url
 */
RouterLayer.pathFor = function(routeName, params) {
  if (!RouterLayer.router) {
    throw new Meteor.Error('router-layer', 'No router is configured');
  }

  check(routeName, String);
  check(params, Match.Optional(Object));

  return this._pathFor(routeName, params);
}

/**
 * Check if the current route has the specified name and params (if set)
 * @param  {String} routeName The name of the route
 * @param  {Object} params    Optional. The parameters of the route
 * @return {Boolean}          True if the route is active
 */
RouterLayer.isActiveRoute = function(routeName, params) {
  if (!RouterLayer.router) {
    throw new Meteor.Error('router-layer', 'No router is configured');
  }

  check(routeName, String);
  check(params, Match.Optional(Object));

  return this._isActiveRoute(routeName, params);
}

/**
 * Check if the current route name, divided by dots, starts with the specified name
 * @param  {String} routeName The name of the route
 * @return {Boolean}          True if the route is active
 */
RouterLayer.isActiveRoutePartial = function(routeName) {
  if (!RouterLayer.router) {
    throw new Meteor.Error('router-layer', 'No router is configured');
  }

  check(routeName, String);

  return this._isActiveRoutePartial(routeName);
}
