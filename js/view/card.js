define([
  'jquery',
  'underscore',
  'backbone',
  'text!template/list.html'
 ], function($, _, Backbone,pageTemp){
  return Backbone.View.extend({
    el: $('#cards'),
	initialize:function(){
		
	},
	 events: {
     "click .add"         : "AddCard",
    },
	
	
    render: function(){
      
	  
	  
		var compiledTemplate = _.template(pageTemp);
     
		this.$el.append( compiledTemplate );
	 
    }
  });
  
});