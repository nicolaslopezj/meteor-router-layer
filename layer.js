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
  RouterLayer.ironRouter = Package['iron:router'].Router;
}

/**
 * Check if uses flow router
 */
if (_.has(Package, 'kadira:flow-router')) {
  RouterLayer.router = 'flow-router';
  if (!_.has(Package, 'kadira:blaze-layout')) {
    throw new Meteor.Error('router-layer', 'If you use kadira:flow-router you must add kadira:blaze-layout');
  }
  RouterLayer.flowRouter = FlowRouter;
}

/*
 * Throw a error if there is no route package
 */
if (!RouterLayer.router) {
  throw new Meteor.Error('router-layer', 'You must add iron:router or kadira:flow-router');
}

/**
 * Creates a new route
 * @param {String} url                        The path of the route
 * @param {Object} [options]
 * @param {String} options.template           The template for this route
 * @param {String} options.name               The name of the route
 * @param {String} options.layout             Optional. The layout for this route
 * @param {Boolean} options.reactiveTemplates Optional. Templates are reactive templates
 */
RouterLayer.route = function(url, options) {
  check(url, String);
  check(options, {
    template: String,
    name: Match.Optional(String),
    layout: Match.Optional(String),
    reactiveTemplates: Match.Optional(Boolean)
  });

  this._route(url, options);
};

/**
 * Returns the path for a route
 * @param  {String} routeName The name of the route
 * @param  {Object} params    Parameters for the route
 * @return {String}           The requested url
 */
RouterLayer.pathFor = function(routeName, params) {
  check(routeName, String);
  //check(params, Match.Optional(Object)); Gives error when passing collection documents

  return this._pathFor(routeName, params);
}

/**
 * Check if the current route has the specified name and params (if set)
 * @param  {String} routeName The name of the route
 * @param  {Object} params    Optional. The parameters of the route
 * @return {Boolean}          True if the route is active
 */
RouterLayer.isActiveRoute = function(routeName, params) {
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
  check(routeName, String);

  return this._isActiveRoutePartial(routeName);
}

/**
 * Redirects the user to the specified route
 * @param  {String} routeName The name of the route
 * @param  {Object} params    Optional. The parameters of the route
 */
RouterLayer.go = function(routeName, params) {
  check(routeName, String);
  check(params, Match.Optional(Object));

  this._go(routeName, params);
}

/**
 * Returns a parameter of the url
 * @param  {String} paramName The name of the parameter
 */
RouterLayer.getParam = function(paramName) {
  check(paramName, String);

  return this._getParam(paramName);
}
