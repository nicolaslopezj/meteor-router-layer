if (RouterLayer.router == 'flow-router') {
  if (Meteor.isClient) {
    Template.registerHelper('yield', function() {
      return Template[Session.get('RouterLayer_flowRouter_currentTemplate')];
    });
  }

  RouterLayer._route = function(url, options) {
    FlowRouter.route(url, {
      name: options.name,
      action: function(params) {
        if (options.layout) {
          Session.set('RouterLayer_flowRouter_currentTemplate', options.template);
          BlazeLayout.render(options.layout);
        } else {
          BlazeLayout.render(options.template);
        }
      }
    });
  };

  RouterLayer._pathFor = function(routeName, params) {
    return FlowRouter.path(routeName, params);
  }

  RouterLayer._isActiveRoute = function(routeName, params) {
    var isActive = true;

    if (FlowRouter.getRouteName() !== routeName) {
      isActive = false;
    }

    if (!params) {
      return isActive;
    }

    _.each(_.keys(params), function(key) {
      if (params[key] !== FlowRouter.getParam(key)) {
        isActive = false;
      }
    });

    return isActive;
  }

  RouterLayer._isActiveRoutePartial = function(routeName) {
    var currentRouteName = FlowRouter.getRouteName().split('.');
    var parts = routeName.split('.');

    for(var i = 0; i < parts.length; i++) {
      if (currentRouteName[i] !== parts[i]) {
        return false;
      }
    }

    return true;
  }
}
