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
}
