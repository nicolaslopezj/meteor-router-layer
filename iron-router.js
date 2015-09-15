IronRouterLayer = function() {
  this._route = function(url, options) {
    Router.route(url, function() {
      if (options.reactiveTemplates) {
        options.layout && this.layout(ReactiveTemplates.get(options.layout));
        this.render(ReactiveTemplates.get(options.template));
      } else {
        options.layout && this.layout(options.layout);
        this.render(options.template);
      }
    }, { name: options.name });
  };

  this._pathFor = function(routeName, params) {
    return Router.path(routeName, params);
  }

  this._isActiveRoute = function(routeName, params) {
    var currentRoute = Router.current();
    var isActive = true;

    if (currentRoute.route.getName() !== routeName) {
      isActive = false;
    }

    if (!params) {
      return isActive;
    }

    _.each(_.keys(params), function(key) {
      if (params[key] !== currentRoute.params[key]) {
        isActive = false;
      }
    });

    return isActive;
  }

  this._isActiveRoutePartial = function(routeName) {
    var currentRouteName = Router.current().route.getName().split('.');
    var parts = routeName.split('.');

    for(var i = 0; i < parts.length; i++) {
      if (currentRouteName[i] !== parts[i]) {
        return false;
      }
    }

    return true;
  }

  this._go = function(routeName, params) {
    Router.go(routeName, params);
  }

  this._getParam = function(paramName) {
    return Router.current().params[paramName];
  }

  this._getQueryParam = function(queryStringKey) {
    return Router.current().params.query[queryStringKey];
  }

  this._getPath = function() {
    return Router.current().location.get().path;
  }

  this._getRoutes = function() {
    return Router.routes;
  }
};
