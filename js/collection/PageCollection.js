
define([
  'underscore',
  'backbone',
  'model/PageModel',
  'localstorage'
], function(_, Backbone, PageModel){
  var ProjectCollection = Backbone.Collection.extend({
    model: PageModel,
	/* comparator: function(model) {
        return model.get('ordinal');
    }, */
	localStorage: new Backbone.LocalStorage("cards")
  });
   return ProjectCollection;
});