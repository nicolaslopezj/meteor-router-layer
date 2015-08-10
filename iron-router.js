if (RouterLayer.router == 'iron-router') {
  RouterLayer._route = function(url, options) {
    Router.route(url, {
      template: options.template,
      layoutTemplate: options.layout,
      name: options.name
    });
  };

  RouterLayer._pathFor = function(routeName, params) {
    return Router.path(routeName, params);
  }

  RouterLayer._isActiveRoute = function(routeName, params) {
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

  RouterLayer._isActiveRoutePartial = function(routeName) {
    var currentRouteName = Router.current().route.getName().split('.');
    var parts = routeName.split('.');

    for(var i = 0; i < parts.length; i++) {
      if (currentRouteName[i] !== parts[i]) {
        return false;
      }
    }

    return true;
  }
}
