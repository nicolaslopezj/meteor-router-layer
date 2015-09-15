FlowRouterLayer = function() {

  this._route = function(url, options) {
    var self = this;

    FlowRouter.route(url, {
      name: options.name,
      action: function(params) {
        if (options.reactiveTemplates) {
          Tracker.autorun(function() {
            if (options.layout) {
              BlazeLayout.render(ReactiveTemplates.get(options.layout), { content: ReactiveTemplates.get(options.template) });
            } else {
              BlazeLayout.render(ReactiveTemplates.get(options.template));
            }
          });
        } else {
          if (options.layout) {
            BlazeLayout.render(options.layout, { content: options.template });
          } else {
            BlazeLayout.render(options.template);
          }
        }
      }
    });
  };

  this._pathFor = function(routeName, params) {
    return FlowRouter.path(routeName, params);
  };

  this._isActiveRoute = function(routeName, params) {
    var isActive = true;

    if (FlowRouter.getRouteName() !== routeName) {
      isActive = false;
    }

    if (!params) {
      return isActive;
    }

    var self = this;
    _.each(_.keys(params), function(key) {
      if (params[key] !== FlowRouter.getParam(key)) {
        isActive = false;
      }
    });

    return isActive;
  };

  this._isActiveRoutePartial = function(routeName) {
    var currentRouteName = FlowRouter.getRouteName().split('.');
    var parts = routeName.split('.');

    for(var i = 0; i < parts.length; i++) {
      if (currentRouteName[i] !== parts[i]) {
        return false;
      }
    }

    return true;
  };

  this._go = function(routeName, params) {
    FlowRouter.go(routeName, params);
  };

  this._getParam = function(paramName) {
    return FlowRouter.getParam(paramName);
  };

  this._getQueryParam = function(queryStringKey) {
    return FlowRouter.getQueryParam(queryStringKey);
  }

  this._getQueryParam = function(queryStringKey) {
    return FlowRouter.getQueryParam(queryStringKey);
  };

  this._getQueryParam = function(queryStringKey) {
    return tFlowRouter.getQueryParam(queryStringKey);
  };

  this._getPath = function() {
    FlowRouter.watchPathChange();
    return FlowRouter.current().path;
  };

  this._getRoutes = function() {
    return FlowRouter._routes;
  };
};