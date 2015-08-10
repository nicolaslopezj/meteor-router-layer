Template.registerHelper('RouterLayerPathFor', function(routeName, options) {
  return RouterLayer.pathFor(routeName, options.hash);
});
