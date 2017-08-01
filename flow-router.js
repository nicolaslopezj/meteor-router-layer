if (RouterLayer.router == 'flow-router') {
  RouterLayer._route = function(url, options) {
    var self = this;

    self.flowRouter.route(url, {
      name: options.name,
      action: function(params) {
        if (options.reactiveTemplates) {
          Tracker.autorun(function() {
            if (options.layout) {
              if (Package['kadira:flow-router'] && Package['kadira:blaze-layout']) {
                self.blazeLayout.render(ReactiveTemplates.get(options.layout), { content: ReactiveTemplates.get(options.template) });
              }
              else {
                self.flowRouter.Renderer.render(ReactiveTemplates.get(options.layout), ReactiveTemplates.get(options.template));
              }
            }
            else {
              if (Package['kadira:flow-router'] && Package['kadira:blaze-layout']) {
                self.blazeLayout.render(ReactiveTemplates.get(options.template));
              }
              else {
                self.flowRouter.Renderer.render(ReactiveTemplates.get(options.template));
              }
            }
          });
        }
        else {
          if (options.layout) {
            if (Package['kadira:flow-router'] && Package['kadira:blaze-layout']) {
              self.blazeLayout.render(options.layout, { content: options.template });
            }
            else {
              self.flowRouter.Renderer.render(options.layout, options.template);
            }
          }
          else {
            if (Package['kadira:flow-router'] && Package['kadira:blaze-layout']) {
              self.blazeLayout.render(options.template);
            }
            else {
              self.flowRouter.Renderer.render(options.template);
            }
          }
        }
      }
    });
  };

  RouterLayer._pathFor = function(routeName, params) {
    return this.flowRouter.path(routeName, params);
  }

  RouterLayer._isActiveRoute = function(routeName, params) {
    var isActive = true;

    if (this.flowRouter.getRouteName() !== routeName) {
      isActive = false;
    }

    if (!params) {
      return isActive;
    }

    var self = this;
    _.each(_.keys(params), function(key) {
      if (params[key] !== self.flowRouter.getParam(key)) {
        isActive = false;
      }
    });

    return isActive;
  }

  RouterLayer._isActiveRoutePartial = function(routeName) {
    var currentRouteName = this.flowRouter.getRouteName().split('.');
    var parts = routeName.split('.');

    for(var i = 0; i < parts.length; i++) {
      if (currentRouteName[i] !== parts[i]) {
        return false;
      }
    }

    return true;
  }

  RouterLayer._go = function(routeName, params) {
    this.flowRouter.go(routeName, params);
  }

  RouterLayer._getParam = function(paramName) {
    return this.flowRouter.getParam(paramName);
  }

  RouterLayer._getQueryParam = function(queryStringKey) {
    return this.flowRouter.getQueryParam(queryStringKey);
  }

  RouterLayer._getPath = function() {
    this.flowRouter.watchPathChange();
    return this.flowRouter.current().path;
  }
}
