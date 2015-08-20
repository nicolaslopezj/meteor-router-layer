/**
 * Init Router Layer
 */
Router = function () {

  /**
   * Check if uses iron router
   */
  if (_.has(Package, 'iron:router')) {
    this._router = 'iron-router';
  }

  /**
   * Check if uses flow router
   */
  if (_.has(Package, 'kadira:flow-router')) {
    this._router = 'flow-router';
    if (!_.has(Package, 'kadira:blaze-layout')) {
      throw new Meteor.Error('router-layer', 'If you use kadira:flow-router you must add kadira:blaze-layout');
    }
  }

  /*
   * Throw a error if there is no route package
   */
  if (!this._router) {
    throw new Meteor.Error('router-layer', 'You must add iron:router or kadira:flow-router');
  }

  switch (this._router) {
    case 'flow-router': FlowRouterLayer.apply(this); break;
    case 'iron-router': IronRouterLayer.apply(this); break;
  }
};

/**
 * Creates a new route
 * @param {String} url                        The path of the route
 * @param {Object} [options]
 * @param {String} options.template           The template for this route
 * @param {String} options.name               The name of the route
 * @param {String} options.layout             Optional. The layout for this route
 * @param {Boolean} options.reactiveTemplates Optional. Templates are reactive templates
 */
Router.prototype.route = function(url, options) {
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
Router.prototype.pathFor = function(routeName, params) {
  check(routeName, String);
  // check(params, Match.Optional(Object)); Gives error when passing collection documents

  return this._pathFor(routeName, params);
}

/**
 * Check if the current route has the specified name and params (if set)
 * @param  {String} routeName The name of the route
 * @param  {Object} params    Optional. The parameters of the route
 * @return {Boolean}          True if the route is active
 */
Router.prototype.isActiveRoute = function(routeName, params) {
  check(routeName, String);
  check(params, Match.Optional(Object));

  return this._isActiveRoute(routeName, params);
}

/**
 * Check if the current route name, divided by dots, starts with the specified name
 * @param  {String} routeName The name of the route
 * @return {Boolean}          True if the route is active
 */
Router.prototype.isActiveRoutePartial = function(routeName) {
  check(routeName, String);

  return this._isActiveRoutePartial(routeName);
}

/**
 * Redirects the user to the specified route
 * @param  {String} routeName The name of the route
 * @param  {Object} params    Optional. The parameters of the route
 */
Router.prototype.go = function(routeName, params) {
  check(routeName, String);
  // check(params, Match.Optional(Object)); Gives error when passing collection documents

  this._go(routeName, params);
}

/**
 * Returns a parameter of the url
 * @param  {String} paramName The name of the parameter
 */
Router.prototype.getParam = function(paramName) {
  check(paramName, String);

  return this._getParam(paramName);
}

/**
 * Returns a parameter of the url query
 * @param  {String} queryStringKey The name of the parameter
 */
Router.prototype.getQueryParam = function(queryStringKey) {
  check(queryStringKey, String);

  return this._getQueryParam(queryStringKey);
}

/**
 * Returns the path of the current route
 * @return {String} The path of the current route
 */
Router.prototype.getPath = function() {
  return this._getPath();
}


/**
 * Returns all the client side routes
 * @return {[Object]} The routes
 */
Router.prototype.getRoutes = function() {
  return this._getRoutes();
}