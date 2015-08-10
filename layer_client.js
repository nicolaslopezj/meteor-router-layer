Template.registerHelper('RouterLayerPathFor', function(routeName, options) {
  return RouterLayer.pathFor(routeName, options.hash);
});

Template.registerHelper('RouterLayerIsActiveRoute', function(routeName, options) {
  return RouterLayer.isActiveRoute(routeName, options.hash) ? 'active': null;
});

Template.registerHelper('RouterLayerIsActiveRoutePartial', function(routeName) {
  return RouterLayer.isActiveRoutePartial(routeName) ? 'active': null;
});
