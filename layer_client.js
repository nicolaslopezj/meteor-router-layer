Template.registerHelper('RouterLayerPathFor', function(routeName, options) {
  return routeName && RouterLayer.pathFor(routeName, options.hash);
});

Template.registerHelper('RouterLayerIsActiveRoute', function(routeName, options) {
  return routeName && RouterLayer.isActiveRoute(routeName, options.hash) ? 'active': null;
});

Template.registerHelper('RouterLayerIsActiveRoutePartial', function(routeName) {
  return routeName && RouterLayer.isActiveRoutePartial(routeName) ? 'active': null;
});

if (RouterLayer.router == 'flow-router') {
  Template.registerHelper('yield', function() {
    if (this.templateContent) {
      return this.templateContent;
    } else {
      return this.content && Template[this.content()];
    }
  });

  Template.registerHelper('Layout', new Template('flowRouter_newTemplate', function () {
    var data = { layout: this._templateInstance.data.template, content: this.templateContentBlock }
    return Blaze.With(data, function() {
      return Template.flowRouter_layoutHelper
    });
  }));

  Template.flowRouter_layoutHelper.helpers({
    data: function() {
      return { templateContent: this.content };
    },
    template: function() {
      return this.layout;
    }
  })
}
