
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ProjectModel = Backbone.Model.extend({
    defaults: {
      label: "Harry Potter",
	  data:""
    }
  });
  // Return the model for the module
  return ProjectModel;
});