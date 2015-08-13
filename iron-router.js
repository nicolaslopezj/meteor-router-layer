if (RouterLayer.router == 'iron-router') {
  RouterLayer._route = function(url, options) {
    this.ironRouter.route(url, function() {
      if (options.reactiveTemplates) {
        options.layout && this.layout(ReactiveTemplates.get(options.layout));
        this.render(ReactiveTemplates.get(options.template));
      } else {
        options.layout && this.layout(options.layout);
        this.render(options.template);
      }
    }, { name: options.name });
  };

  RouterLayer._pathFor = function(routeName, params) {
    return this.ironRouter.path(routeName, params);
  }

  RouterLayer._isActiveRoute = function(routeName, params) {
    var currentRoute = this.ironRouter.current();
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
    var currentRouteName = this.ironRouter.current().route.getName().split('.');
    var parts = routeName.split('.');

    for(var i = 0; i < parts.length; i++) {
      if (currentRouteName[i] !== parts[i]) {
        return false;
      }
    }

    return true;
  }

  RouterLayer._go = function(routeName, params) {
    this.ironRouter.go(routeName, params);
  }

  RouterLayer._getParam = function(paramName) {
    return this.ironRouter.current().params[paramName];
  }

  RouterLayer._getQueryParam = function(queryStringKey) {
    return this.ironRouter.current().params.query[queryStringKey];
  }

  RouterLayer._getPath = function() {
    return this.ironRouter.current().location.get().path
  }
}
